let dic = [
    
    {"tags" : "greetings",
    "patterns" : ["hello", "hi", "what is up", "what's up"],
    "responses": ["hello how are you?"],
     "context_set" : "greetings",
     "context_filter" : "",
    },

    {"tags" : "greetings_response",
    "patterns" : ["i am good"],
    "responses": ["That is good to hear!"],
     "context_set" : "",
     "context_filter" : "greetings",
    },
    
    {"tags" : "age",
    "patterns" : ["how old are you", "what is your age", "what's your age"],
    "responses": ["I am 18 years old", "Im 18"],
     "context_set" : "",
     "context_filter" : "",
    },
    
    {"tags" : "name",
    "patterns" : ["what is your name", "what's your name"],
    "responses": ["my name is anthony", "anthony"],
     "context_set" : "",
     "context_filter" : "",
    }
     
  ]