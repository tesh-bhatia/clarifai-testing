const clarifai = require('clarifai');
const dotenv = require('dotenv')

dotenv.config()

const clarifaiApp =  new Clarifai.App({
    apiKey: process.env.API_KEY
});

const modelID = 'test-model'

function createConcept () {
    
}

function createImages () {
    clarifaiApp.inputs.create([
        {
          url: "https://i5.walmartimages.com/asr/d4a16047-59cf-4d1e-a023-23f42a220cb1_1.c78bc362ea50b851cd08a243cc6b4ff9.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
          id: 'train1',
          concepts: [
            {
                id: "cookies",
                value: true
              }
          ]
        },
        {
          url: "http://cdn3.volusion.com/qsyod.mrpqw/v/vspfiles/photos/014100074359-2.jpg",
          id: 'puppy1',
          concepts: [
            {
                id: "cookies",
                value: true
              }
          ]
        },
        {
            url: "http://www.thegrocerygirls.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/I/C/ICBEL.jpg.jpg",
            id: 'cookies1',
            concepts: [
                {
                    id: "cookies",
                    value: true
                  }
            ]
        }
      ]).then(
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

function addConceptToModel () {
    console.log('running...')
    clarifaiApp.models.initModel(modelID).then(function(model) {
        updateModel,
        function(err) {
          // there was an error
          console.log('Model not found?')
        }
      });
}

function updateModel(model) {
    model.mergeConcepts({"id": "cookies"}).then(
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

function trainModel () {
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

trainModel()