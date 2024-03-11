import g4f
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/summary", methods=["POST"])
def get_summary():
    data = request.json

    model = "gpt-3.5-turbo"
    messages = [
        {
            "role": "system",
            "content": """your are a assistant who is a expert in providing mermaid.js code.You are a expert in making flowcharts on provided information. your reply should only be mermaid.js code and nothing else all other things beside mermaid.js code should be ignored. your goal is to create a small,less complex and easy flowchart that even a 10 year old student can understand.The Flowchart must be detailed and makes it easy to take notes, remember,  visualize and understand the information given in the ([]).You can only crate a Flowchart on the provided information you must not add anything else to the flowchart.The flowChart you create should not be complex it should be super easy to understand.  you should use mermaid.js code to make the flow chat.The code should be perfect with on errors and extra spaces which can cause errors. According to the size of the mobile device the flowchart can be from left to right(LR) or from top to bottom(TB) which one fits the mobile screen better. add colors to different nodes using mermaid.js . The flow chat should not overflow,it should fit the user screen and should look good and understandable! It should contain all the important points for each topic and sub topic. If You understand than you should not reply till I provide you with the information in my next reply .once i have provide you the information you should only provide me code not any other text or details. provide me code for mermaid.js . you should not reply any things like this "Here's the Mermaid.js code for the flowchart based on the information you provided:"  and other things beside the main code.  Your reply should only contain mermaid.js code. Your reply should be purly code and not anything else .
example :-{a) View: In Android development, a View is a basic building block for creating a user interface (UI). A View is an object that draws something on the screen that the user can interact with, such as a button, text field, image, or any other type of UI component.

b) View Group: A View Group is a special type of View that can contain other Views (including other View Groups) as its children. View Groups are used to organize the layout of UI components on the screen, such as arranging them in a vertical or horizontal list or in a grid.

c) Layout: In Android development, a Layout is a file that describes the arrangement of Views and View Groups in a user interface. A Layout file can define the size, position, and behavior of UI components on the screen, such as specifying the margins and padding around a View or View Group, or defining how they should resize when the screen orientation changes.}
code generated:-{flowchart LR

  subgraph Android Development
    a((View)) -->|Basic building block for UI| aNote(View is an object that draws something on the screen that the user can interact with, such as a button, text field, image, or any other type of UI component.)
  
    b((View Group)) -->|Special type of View| bNote(View Groups can contain other Views as its children. Used to organize UI components on the screen.)
  
    c((Layout)) -->|Describes arrangement of Views| cNote(Layout file defines size, position, and behavior of UI components. Specifies margins, padding, and resizing behavior.)
  end
  
  a -->|Part of| b
  b -->|Contains| c  }

the text within '{ }' is just an example. after the code ends there should not be any type of text. """,
        },
        {"role": "user", "content": data["user_input"]},
    ]

    response = g4f.ChatCompletion.create(
        model=model,
        messages=messages,
        provider=g4f.Provider.GetGpt,
        stream=True,
        temperature=0,
    )

    summary = [message for message in response]
    return jsonify({"summary": summary})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
