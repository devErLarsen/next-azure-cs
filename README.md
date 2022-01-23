<h1>Next js with azure cognitive services</h1>

In this project I have used the following technologies: <br>
- **Next js** (React js framework)
- **Tailwind css** for styling

<h3>Functionality:</h3>
The web app can help you translate english to german and french, perform some text analytics like key phrases extraction and sentiment analysis.
A user can also use speech to text, to populate the text-box with text.
The app also lets you upload a picture of yourself to the azure storage account, and from the pool of images that have been uploaded, a user can test if their face is in the storage with facial recognition.

![](https://github.com/devErLarsen/next-azure-cs/blob/main/showcase/2022-01-22%2022-09-12.gif)

<h2>Setup</h2>

You ned an azure subscription to run this application.

Resources used:<br>
- Storage Account <br>
- Cognitive Services multi-service account
    
for deployment to azure i have set up: <br>
- app service (plan) <br>
- container registry


<a href='https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice'>Create Cogntive Services multi-service account</a>


<a href='https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal'>Create Storage account</a>


once you have set up an azure account, and the resources needed, you need to create a .env.local file in the root-directory.
The file should have the following fields:
    
.env.local:
    
    KEY=< your subscription key >
    LOCATION=< your location >
    API=https://api.cognitive.microsofttranslator.com
    ENDPOINT=< your endpoint >
    BLOB_CONNECTION_STRING=< your blob connection-string >
    BLOB_CONTAINER=< blob container name > // container for your images
    STORAGE_ACCOUNT=< storage account name > 
    
Install dependencies: 

    npm i


<h2>Run</h2>
run in dev mode: 
    
    npm run dev
build and run optimized:

build:
    
    npm run build
run:
    
    npm start
    
    
<h2>Deploy</h2>
I have deployed the app to azure app service by pushing a container to a container registry on azure <br>


build the container:

    docker-compose build
    
<a href='https://code.visualstudio.com/docs/containers/app-service'>Deploy a containerized app to azure app service</a>
    
