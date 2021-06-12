let words = []
let labels = []
let docs_x = []
let docs_y = []

//TOKENIZING PROCESS

for (i=0 ; i<dic.length ; i++) {

    labels.push(dic[i].tags)

    let key = dic[i].patterns

    for (a=0 ; a<key.length ; a++) {

        docs_y.push(dic[i].tags)

        let split = key[a].split(' ')

        docs_x.push(split)

        for (let key2 of split) {

        words.push(key2)

        }
    }
}

let new_words = []

let set_words = (new Set(words))

for (let key of set_words) {

    new_words.push(key)
    
}

new_words = (new_words.sort())

let training = []

let output = []

let output_empty = []

for (i=0 ; i<labels.length ; i++) {

    output_empty.push(0)

}

for (i=0 ; i<docs_x.length ; i++) {
    
    let bag = []

    let wrds = (docs_x[i])

    for (a=0 ; a<new_words.length ; a++) {

        let key = new_words[a]

        if (wrds.indexOf(key) != -1) {

            bag.push(1)

        } else {

            bag.push(0)

        }

    }

    output_row = []

    for (let key of output_empty) {

        output_row.push(key)

    }

    output_row[labels.indexOf(docs_y[i])] = 1

    training.push(bag)

    output.push(output_row)

}

output_tf = tf.tensor(output)

training_tf = tf.tensor(training)

//TOKENIZATION COMPLETE

//CREATING THE NUERAL NETWORK

async function NN() {
    
    const model = tf.sequential()
    model.add(tf.layers.dense({units: 5, inputShape: new_words.length}));
    model.add(tf.layers.dense({units: 5}));
    model.add(tf.layers.dense({units: 5}));
    model.add(tf.layers.dense({units: labels.length, activation: 'softmax'}));
    model.summary()

        model.compile({optimizer: 'sgd', loss: 'categoricalCrossentropy'});


    for (i=1 ; i<4 ; i++) {
        const h = await model.fit(training_tf, output_tf, {
        batchSize: 100,
        epochs: 1000,
    });
    console.log("Loss after Epoch " + i + " : " + h.history.loss[0]);

    } 

    const saveResults = await model.save('localstorage://my-model-1');

    console.log('complete')

}

//SETTING THE CONTEXT

let context = ''

let no_input = []

for (i=0; i<new_words.length; i++) {

    no_input.push(0)

}


//FUNCTION USED TO CHAT


async function chat() {

    
    const model = await tf.loadLayersModel('localstorage://my-model-1');

    let input = document.getElementById('submit_input').value

    let chatbot_input = (bagofwords(input))

    let results = model.predict(tf.tensor(chatbot_input, [1,new_words.length]))
    results.print()

    document.getElementById('submit_input').value='';

    let result_array = results.arraySync()

    result_array = result_array[0]

    let index_value = Math.max.apply(Math, result_array)

    let index = result_array.indexOf(index_value)


    if (index_value > .95) {

    context_filter = dic[index].context_filter

    let context_match = true

        if (context_filter == context) {

            context_match = true

            context = dic[index].context_set

        } else {

            context_match = false

            result_array.splice(index, 1)

            index_value = Math.max.apply(Math, result_array)

        }

    } else {

        if (context != '') {

            context_filter = dic[index].context_filter

            let context_match = true
        
                if (context_filter == context) {
        
                    context_match = true
        
                    context = dic[index].context_set
        
                } else {
        
                    context_match = false
        
                    result_array.splice(index, 1)
        
                    index_value = Math.max.apply(Math, result_array)
        
                    console.log(index_value)
                }

        } else {
     
            context_filter = ''
            context = ''

        }
    }


    if (index_value > .95) {

        index = result_array.indexOf(index_value)

        answer = dic[index].responses

        let num_index = Math.floor(Math.random() * (answer.length));

        console.log("response(s) are: " + answer)
                
        //Displaying your pattern

        let box = document.createElement('div')
        box.setAttribute('id','box')
        document.getElementById('c').appendChild(box);

        let patt = document.createElement('p');

        patt.innerText = input;

        patt.style.margin = '0px'

        patt.style.textAlign = 'left'

        patt.style.overflowWrap = 'break-word'

        document.getElementById('box').appendChild(patt); 
        
        box.setAttribute('id','used_box')

        scroll()

        //Displaying the bot's response

        let res_box = document.createElement('div')

        res_box.setAttribute('id','res_box')

        document.getElementById('c').appendChild(res_box);
        
        let res = document.createElement('p');

        res.innerText = answer[num_index];
        
        res.style.margin = '0px'
        
        res.style.textAlign = 'left'

        res.style.overflowWrap = 'break-word'

        document.getElementById('res_box').appendChild(res);

        res_box.setAttribute('id','used_res_box')

        scroll()

    } else {

        console.log("responses are: I dont understand the input")
        
        //Displaying your pattern

        let box = document.createElement('div')

        box.setAttribute('id','box')

        document.getElementById('c').appendChild(box);

        let patt = document.createElement('p');

        patt.innerText = input;

        patt.style.margin = '0px'
        
        patt.style.textAlign = 'left'

        patt.style.overflowWrap = 'break-word'

        document.getElementById('box').appendChild(patt);   

        box.setAttribute('id','used_box')

        scroll()

        //Displaying the bot's response

        let res_box = document.createElement('div')

        res_box.setAttribute('id','res_box')

        document.getElementById('c').appendChild(res_box);
            
        let res = document.createElement('p');

        res.innerText = "I dont understand the input";

        res.style.margin = '0px'
        
        res.style.textAlign = 'left'

        res.style.overflowWrap = 'break-word'

        document.getElementById('res_box').appendChild(res);  
        
        res_box.setAttribute('id','used_res_box')
        
        scroll()

    }


}


//TOKENIZING THE INPUT


function bagofwords(s) {

    let bag = []

    for (key of new_words) {
        bag.push(0)
    }

    console.log(s)

    s = s.replace('?','')

    s = s.toLowerCase()

    console.log(s)

    let split_words = s.split(' ')

    for (i=0 ; i<split_words.length; i++) {

        let key = (split_words[i])

        if (new_words.indexOf(key) != -1) {

            bag[new_words.indexOf(key)] = 1

        } 
    }

    console.log(bag)

    return bag

}

