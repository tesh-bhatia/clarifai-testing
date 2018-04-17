const clarifai = require('clarifai');
const dotenv = require('dotenv')
const fs = require('fs')


//add images to concept w/ concept -> attach to model -> train model
dotenv.config()

const clarifaiApp =  new Clarifai.App({
    apiKey: process.env.API_KEY
});

const modelID = 'test-model'
const testPhoto = fs.readFileSync('./images/cookies.jpeg', 'base64');

const bezosArr = ['https://static.techspot.com/images2/news/bigimage/2018/01/2018-01-09-image-17.jpg', 'https://cdn-images-1.medium.com/max/799/1*3U0r3rpqtU0L3AHJ0ygzig.jpeg', 'https://fortunedotcom.files.wordpress.com/2016/03/bez04_2.jpg', 'https://timedotcom.files.wordpress.com/2017/04/time-100-2017-jeff-bezos.jpg?h=580', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZafkPAnJ62MZ8iQb9tamEGZFm90VZXtSk5lHa2FnH6Iu07U3y']

const oreosArr = ['https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/oreolead-1494013639.png?crop=1.00xw:1.00xh;0,0&resize=768:*', 'https://smedia.webcollage.net/rwvfp/wc/cp/26597639/module/mondelez/_cp/products/1474255996629/tab-0b4e8cc1-18ba-4767-a72c-08d3a822c7d2/803597f3-b237-42d8-a2d2-1115f8d9eb69.jpg.w960.jpg', 'https://smedia.webcollage.net/rwvfp/wc/cp/26597639/module/mondelez/_cp/products/1474255996629/tab-0b4e8cc1-18ba-4767-a72c-08d3a822c7d2/284500ef-ad6d-430a-9e75-aa7e0c79da96.JPG.w960.jpg']



function createImages (imagesArr, conceptName) {
    const inputArr = imagesArr.map((image, index) => {
        return ({
            url: image,
            id: conceptName + index,
            concepts: [
                {
                    id: conceptName,
                    value: true
                }
            ]
        })
    })

    console.log(inputArr)

    clarifaiApp.inputs.create(inputArr).then(
        function(response) {
          // do something with response
          console.log(response)
          console.log('SUCCESS!')
        },
        function(err) {
          // there was an error
          console.log(err)
          console.log('FAILURE!')
        }
    );
}

function addConceptToModel (modelID, conceptName) {
    console.log('running...')
    clarifaiApp.models.initModel(modelID).then(function(model) {
        console.log('first function running')
        console.log(model)
        updateModel(model, conceptName)},
        function(err) {
          // there was an error
          console.log('Model not found?')
        }
    );
}

function updateModel(model, conceptName) {
    console.log('second function running')
    model.mergeConcepts({"id": conceptName}).then(
      function(response) {
        // do something with response
        console.log('Concept merged!')
        console.log(response)
      },
      function(err) {
        // there was an error
        console.log('Aw shit..')
      }
    );
  }

function trainModel (modelID) {
    clarifaiApp.models.train("test-model").then(
        function(response) {
          // do something with response
          console.log('Model trained')
        },
        function(err) {
          // there was an error
          console.log('Model still dumb...')
        }
      );
}

function predictContent (img) {
    clarifaiApp.models.predict("test-model", [img]).then(
        function(response) {
            // do something with response
            console.log('Predicting...')
            console.log(response.rawData.outputs[0].data)
        },
        function(err) {
            // there was an error
            console.log('Fuck')
        }
    );
}

// createConcept(modelID, 'bezos')

// clarifaiApp.concepts.list().then(
//     function(response){
//         console.log(response)
//     },
//     function(err){
//         console.log(err)
//     }
// )

// createImages(oreosArr, 'oreos')

predictContent('https://specials-images.forbesimg.com/imageserve/5a8d920d31358e4955adf197/416x416.jpg?background=000000&cropX1=755&cropX2=2357&cropY1=494&cropY2=2097')

