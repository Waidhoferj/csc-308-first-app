from flask import jsonify, request, Flask
import uuid
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

users = [
      { 
         'id' : 'xyz789',
         'name' : 'Charlie',
         'job': 'Janitor',
      },
      {
         'id' : 'abc123', 
         'name': 'Mac',
         'job': 'Bouncer',
      },
      {
         'id' : 'ppp222', 
         'name': 'Mac',
         'job': 'Professor',
      }, 
      {
         'id' : 'yat999', 
         'name': 'Dee',
         'job': 'Aspring actress',
      },
      {
         'id' : 'zap555', 
         'name': 'Dennis',
         'job': 'Bartender',
      }
   ]

@app.route("/")
def hello_world():
    return jsonify({
       "routes": {
          "users" :"/users(name)",
          "user": "user/<id>"
       }
    })

@app.route("/users", methods=["GET", "POST", "DELETE"])
def handle_users():
   global users
   if request.method == "GET":
      username = request.args.get("name")
      if username:
         return {"users": [user for user in users if user["name"] == username]}
      else:
         return {"users": users}
   elif request.method == "POST":
      payload = request.get_json()
      if payload and"name" in payload and "job" in payload:
         id = uuid.uuid1().hex
         person = {"name" : payload["name"], "job" : payload["job"], "id" : id }
         users.append(person)
         return id, 201
      else:
         return "Please include a payload in your post request", 400
   elif request.method == "DELETE":
      username = request.args.get("name")
      users = [u for u in users if u["name"] != username]
      return False, 200

   else:
      return "This person doesn't exist", 404

   
@app.route("/user/<id>", methods=["GET", "DELETE"])
def handle_user_by_id(id):
   if request.method == "GET":
      search_result = [user for user in users if user["id"] == id]
      return (search_result[0], 200) if len(search_result) > 0 else ({}, 400)
   if request.method == "DELETE":
      for user in users:
         if user["id"] == id:
            users.remove(user)
            return "User Deleted", 200
      return "This person doesn't exist", 404
