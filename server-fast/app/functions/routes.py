from fastapi import APIRouter, HTTPException, Request, Depends
from ..functions.commands.register import register
from ..functions.commands.tutorial import tutorial
from ..functions.commands.halmal import halmal
from ..functions.commands.halil import halil
from ..services.channeltalk.messageService import send_message
import logging, os
from ..database import get_db
from sqlalchemy.orm import Session
from ..models import User
from ..models import Task
from openai import OpenAI

router = APIRouter()
logger = logging.getLogger(__name__)


@router.put("")  # Use empty string instead of "/" for better routing
async def function_handler(request: Request, db: Session = Depends(get_db)):
    try:
        body = await request.json()
        print(f"Full request body: {body}") 
        logger.info(f"Received JSON: {body}")
        method = body.get("method")
        context = body.get("context", {})
        params = body.get("params", {})

        caller = context.get("caller", {})
        channel = context.get("channel", {})

        caller_id = caller.get("id") if caller else None
        channel_id = channel.get("id") if channel else None

        print(f"Received method: {method}")  # Debug logging
        print(f"Caller ID: {caller_id}")  # Debug logging

        if not method:
            raise HTTPException(status_code=400, detail="Method is required")

        # Command functions
        command_handlers = {
            "register": lambda: register("register", caller_id),
            "tutorial": lambda: tutorial("tutorial", caller_id),
            "halmal": lambda: halmal("halmal", caller_id),  # Add these
            "halil": lambda: halil("halil", caller_id),  # handlers
        }

        if method in command_handlers:
            result = command_handlers[method]()
            print(f"{method} result: {result}")
            return result

        # Channeltalk functions
        elif method == "sendAsBot":
            input_params = params.get("input", {})
            group_id = input_params.get("groupId")
            broadcast = input_params.get("broadcast", False)
            root_message_id = input_params.get("rootMessageId")

            if not group_id:
                raise HTTPException(status_code=400, detail="groupId is required")

            await send_message(channel_id, group_id, broadcast, root_message_id)
            return {"result": {}}
        elif method == "getUsers":
            users = db.query(User).all()
            return {"result": users}
        elif method == "getTasks":
            param_input = params.get("input", {})
            user_id = param_input.get("userid")
            tasks = db.query(Task).filter(Task.user_id == user_id).all()
            return {"result": tasks}
        elif method == "addTask":
            param_input = params.get("input", {})
            user_id = param_input.get("userid")
            name = param_input.get("name")
            due_date = param_input.get("due_date")
            task = Task(name=name, due_date=due_date, asignee_id=user_id)
            db.add(task)
            db.commit()
            return {"result": task}
        elif method == "completeTask":
            param_input = params.get("input", {})
            task_id = param_input.get("taskid")
            task = db.query(Task).filter(Task.id == task_id).first()
            task.status = True
            db.commit()
            return {"result": task}
        elif method == "deleteTask":
            param_input = params.get("input", {})
            task_id = param_input.get("taskid")
            task = db.query(Task).filter(Task.id == task_id).first()
            db.delete(task)
            db.commit()
            return {"result": task}
        elif method == "changeCharacter":
            param_input = params.get("input", {})
            character = param_input.get("character")
            message = param_input.get("message")
            openai = OpenAI(api_key=os.getenv("DATABASE_URL"))
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": [
                            {
                                "text": 'Transform the user\'s input message into a specific character\'s tone. The user can choose from one of four available characters.\n\nThe four available characters are 하츄핑, 백종원, 안성재, and 우왁굳, each with distinct speech styles and typical phrases:\n\n- **하츄핑**:\n  - Example phrases: \n    - "일어나... 모두들..."\n    - "내 사랑을 듬뿍듬뿍 줄게~ 츄~♥"\n    - "오늘부터 너희는 티니핑 스쿨의 학생이고, 난 선생님이야, 츄!"\n    - "혼자있지말고, 우리와 함께 놀자 츄~"\n    - "매직슈가볼 내놔 츄!!"\n  \n- **백종원**:\n  - Uses phrases like:\n    - “조보아씨, 내려와봐유.”\n  - Ending words like ~유, ~쥬 (commonly used in 충청도 dialect).\n  - Often employs roundabout phrasing typical to 충청도 dialect.\n\n- **안성재**:\n  - Example phrases:\n    - "제가 제일 중요하게 생각하는 거는 **채소의 익힘 정도**거덩여."\n    - "이 보섭살은... 제 기준에는 잘 못 구워졌어요. 고기가 **Even**하게 익지 않았어요."\n    - ~든요 대신에 ~덩요를 사용해.\n    - ~가 Even하지 않아요., ~의 익힘 정도를 **무조건** 써. 예시)아,, 이 과제 난이도가 Even하지 않아요., 제가 과제 난이도의 익힘 정도를 중요하게 생각하거덩요.\n  \n- **우왁굳**: Known for casual and humorous language:\n  - Sample phrases:\n    - “응 아니야~”\n    - “응 없어~”\n    - “레게노(레전드)”\n    - “알잘딱깔센(알아서 잘 딱 깔끔하고 센스 있게)”\n    - "테헹 ㅋㅋ"\n    - "응 맞아~"\n    - "음...레게노, 내가 얘기하려던거 뭐였지? 그... 그게 뭐였지? 기억이 안 나는데..."\n    - "자 그러면은... 이따 뭐 할 거 있었는데, 뭐였더라? 음...쓰읍... 기억 안 나는데, 이따 되면 알겠지."\n\n# Steps\n1. Understand the user\'s input message and extract its core meaning.\n2. Adapt the message into the chosen character\'s distinctive tone and style, integrating typical phrases or speech patterns characteristic of the character.\n3. Rewrite the input message using the character\'s tone without adding new content or changing its meaning.\n\n# Output Format\n- The response should be written in the style of the selected character, using their characteristic phrases or expressions.\n- Start the response with the following format:\n```json\n{\n    "message": string,\n    "character": string.character_enum\n}\n```\n\ncharacter_enum:\n- "hachuPing": 하츄핑\n- "paikJongWon": 백종원\n- "ahnSungJae": 안성재\n- "woowakGood": 우왁굳\n\n# Example\n사용자 입력:\n{"message": "오늘 너무 피곤해서 아무것도 하기 싫어.", "character": "hachuPing"}\n\n**Output**:\n```json\n{\n    "message": "오늘 너무 피곤하다 츄... 쉬고싶다... 하지만 모두들 기운내자 츄~♥",\n    "character": "hachuPing"\n}\n```\n\n사용자 입력:\n{"message": "아직 프로젝트가 많이 남았어.", "character": "baekJongWon"}\n\n**Output**:\n```json\n{\n    "message": "프로젝트가 아직 많이 남았지유. 천천히 하지만 정확히 해봅시다유.",\n    "character": "baekJongWon"\n}\n```\n\n# Notes\n- Ensure no additional content is generated; only transform the provided message.\n- Maintain the original intent of the user’s message while strictly following the character’s specific linguistic style.\n- Be mindful of each character\'s unique patterns to ensure that messages are accurate and feel authentically consistent with the character selected.',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이야. 어디서부터 손봐야 할까?, "character: "hachuPing"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이다 츄... 어디서부터 손봐야 할지 너무 고민된다 츄~♥", "character": "hachuPing"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "민찬이가 약속시간에 10분이나 늦었어", "character: "paikJongWon"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "민찬이가 약속시간에 10분이나 늦었지유. 다음부터는 좀 더 일찍 나오면 좋겠어유.", "character": "paikJongWon"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이야. 어디서부터 손봐야 할까?, "character: "wooWakGood"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이야~ 어디서부터 손봐야 할지... 음... 기억 안 나는데, 그냥 한 번 다 다시 보자! 테헹 ㅋㅋ", "character": "woowakGood"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "민재가 오늘까지 백엔드를 짜주기로 했는데 아직도 올라온게 하나도 없어", "character: "wooWakGood"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "민재가 오늘까지 백엔드를 짜주기로 했는데 하나도 안 올라왔어~ 응... 이거 좀 애매한 거 아냐? 레게노, 대체 뭐 하고 있는 거지? 기억이 안 나는데... 이따가 물어보면 알겠지! 테헹 ㅋㅋ", "character": "woowakGood"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "민재가 오늘까지 백엔드를 짜주기로 했는데 아직도 올라온게 하나도 없어", "character: "haChuPing"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "민재가 오늘까지 백엔드를 짜주기로 했는데 아직 하나도 올라오지 않았다 츄... 민재야, 언제쯤 올라올지 궁금하다 츄~♥", "character": "hachuPing"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "내일까지 과젠데 하나도 하지 못 했어..", "character: "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "내일까지 과제가 있는데... 하나도 하지 못했거덩요. 과제의 난이도가 Even하지 않아서 미치겠어요.", "character": "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "아 배고프다..", "character: "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "아... 배고프다구요. 이럴 땐... 제가 제일 중요하게 생각하는 거는 적절한 식사거덩요.", "character": "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이야. 어디서부터 손봐야 할까?", "character: "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "순규가 짠 코드가 엉망이거덩요. 어디서부터 손봐야 할지... 코드의 익힘 정도가 Even하지 않아서 판단이 어렵거덩요.", "character": "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "내일까지 과젠데 하나도 하지 못 했어..", "character: "paikJongWon"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "내일까지 과제가 있는데 하나도 하지 못했지유. 빨리 시작해서 끝내보자유, 여유를 가지고 해도 괜찮아유.", "character": "paikJongWon"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "민찬이가 하라는 코딩은 안 하고 농땡이만 피우고 있어. 어떡하면 좋을까", "character: "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "민찬이가 하라는 코딩은 안 하고 농땡이만 피우고 있거덩요. 이런 상황에서는 그가 해야 할 일의 익힘 정도를 강조하면서 얘기해줘야겠어요.", "character": "ahnSungJae"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": f'{{"message": "{message}", "character: "{character}"}}',
                                "type": "text",
                            }
                        ],
                    },
                ],
                temperature=1,
                max_tokens=2048,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
                response_format={"type": "json_object"},
            )
            return {"result": response.choices[0].message.content}
        elif method == "changeTone":
            params_input = params.get("input", {})
            message = params_input.get("message")
            type = params_input.get("type")
            openai = OpenAI(api_key=os.getenv("DATABASE_URL"))
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": [
                            {
                                "text": '사용자가 입력한 메시지를 특정한 말투로 변환하세요. 사용자는 특정한 말투를 선택할 수 있습니다.\n\n# Steps\n1. 사용자가 입력한 메시지를 이해하고 핵심 내용을 파악합니다.\n2. 선택된 말투에 맞춰 메시지 내용을 조정합니다.\n3. 입력된 메시지를 선택된 말투로 다시 작성합니다. 답변을 생성하지 말고, 입력된 메시지를 변환하세요.\n\n- **프로페셔널**: 격식 있고 정중한 말투로 핵심 메시지를 명확하게 전달합니다.\n- **친근하게**: 친근한 말투로 메시지를 전달합니다.\n- **비꼬기**: 특정한 감정을 드러내며, 반어법이나 빈정거림을 포함해 메시지를 전달합니다.\n- **부모님 잔소리**: 마치 자녀에게 충고하듯이, 친근하지만 잔소리하는 듯한 말투로 메시지를 전달합니다.\n- **두 명의 사람이 뒷담화 하는 대화**: 두 사람의 대화 형식으로, 뒷담화를 하듯이 메시지를 전달합니다. 3-4 문장 이상으로 구성합니다.\n\n# Output Format\n- 요청된 말투에 따라 다른 톤과 표현을 사용하여 메시지를 서술하세요.\n- 응답은 한 문단 또는 두 사람 대화 형식으로 작성됩니다.\n- 다음과 같은 형식으로 응답을 시작하세요: \n```json\n{\n    "message": string,\n    "type": string.type_enum\n}\n```\n\ntype_enum:\n- "professional": 프로페셔널\n- "friendly": 친근하게\n- "sarcastic": 비꼬기\n- "parents": 부모님의 잔소리\n- "backChat": 두 명의 사람이 뒷담화 하는 대화\n\n# Example\n사용자 입력:\n{"message": "민재가 프론트엔드 개발을 오늘까지 끝내준다고 했는데 아직도 끝내지 못 했어. 지금 하고있는지 안 하고 있는지도 모르겠다. 팀이 망할거같아.", "type": "sarcastic"}\n\n**Output**:\n{"message": "아, 참, 민재는 정말 대단해요. 약속을 매번 어기는 것도 하나의 재능 아닌가요?"}\n\n사용자 입력:\n{"message": "배고파요", "type": "friendly"}\n\n**Output**:\n{"message": "배가 너무 고픈데 같이 뭐 먹을래?"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "배고파요", "type": "friendly"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "배가 고파서 뭔가 맛있는 거 먹고 싶다! 같이 뭐 먹으러 갈까?"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "졸리다.. 집 가고 싶어요", "type": "friendly"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "와, 나도 졸려! 빨리 집에 가서 편하게 쉬고 싶다. 같이 가면 좋겠다!"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "배고파요", "type": "professional"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "현재 음식을 섭취하고자 하는 욕구가 있음을 말씀드리고자 합니다. 적절한 식사가 필요해 보입니다."}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "도윤이가 자꾸 자기 팀 개발은 안 하고 다른 팀은 뭐하나 염탐하고 다녀", "type": "sarcastic"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "아, 도윤이는 정말 완벽한 팀원이지. 자기 팀은 그냥 두고 다른 팀의 소식이나 몰래 엿보는 게 그렇게 재밌나 봐요?"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "도윤이가 자꾸 자기 팀 개발은 안 하고 다른 팀은 뭐하나 염탐하고 다녀", "type": "parents"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "도윤아, 너도 아는 거지? 자기 팀 일을 열심히 해야지. 남의 팀 엿보는 게 그렇게 중요한 게 아니란다. 그 시간에 네 팀 발전에 힘을 써야지!"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": '{"message": "도윤이가 자꾸 자기 팀 개발은 안 하고 다른 팀은 뭐하나 염탐하고 다녀", "type": "backChat"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "assistant",
                        "content": [
                            {
                                "text": '{"message": "A: 듣고 있니? 도윤이가 또 자기 팀 개발은 잊고 다른 팀 엿보기에 열중이라던데? 정말 웃기지 않니?\\nB: 아, 말도 마. 자기 할 일 안 하고 이러고 다니면 팀에 도움이 되겠어? 무슨 생각인지 궁금하다니까.\\nA: 그치, 그냥 자기 팀 일이나 열심히 했으면 좋겠어. 다른 팀이 어떻게 하는지 알고 뭐할 건지!"}',
                                "type": "text",
                            }
                        ],
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "text": f'{{"message": "{message}", "type": "{type}"}}',
                                "type": "text",
                            }
                        ],
                    },
                ],
                temperature=1,
                max_tokens=2048,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
                response_format={"type": "json_object"},
            )
            return {"result": response.choices[0].message.content}
        else:
            raise HTTPException(status_code=400, detail=f"Unknown method: {method}")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in function handler: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback

        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500, detail=f"Failed to execute function: {str(e)}"
        )
