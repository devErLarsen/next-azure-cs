you ned an azure subscription to run this application.

resources used used: 
    run locally: 
        storage
        Cognitive Services multi-service account

    deployment:
        app service (plan)
        container registry


Create Storage account:



once you have set up an azure account, and the resources needed, you need to create a .env.local file in the root-directory.
The file should have the following fields:
    KEY=< your subscription key >
    LOCATION=< your location >
    API=https://api.cognitive.microsofttranslator.com
    ENDPOINT=< your endpoint >

    BLOB_CONNECTION_STRING=< your blob connection-string >
    BLOB_CONTAINER=< blob container name > // container for your images
    STORAGE_ACCOUNT=< storage account name > 





