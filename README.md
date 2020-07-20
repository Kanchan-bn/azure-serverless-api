# azure-serverless-api
This is an Azure function - serverless API created using Azure functions extension in VSCode
The code contains two sections:
Server - API code, Fake db in-memory object storage, authentication logic
And Client - a sample react UI to integrate the API to demonstrate calling different methods on the end-point

## Local Setup
1. Clone the repo
2. Install Azure function cli extension on VSCode
3. Navigate to the 'server' folder from a terminal and run ```npm install```
4. Run the server in debug mode, open the server folder in VSCode and press F5 (this also generates the local.settings.json)
5. Enable cors by adding the this in the local.settings.json
 ``` "Host": {"LocalHttpPort": 7071, "CORS": "*", "CORSCredentials": false }```
6. To run the API execute ```func start``` from the terminal
7. Navigate to the 'client' folder from the terminal and run ```npm install```
8. Run ```npm start```
9. Access the UI at ```http://localhost:1234```

## Design
1. Array object is used as the fake database. Initialised to empty, meaning there are no products in the db to begin with.
2. Users array is populated with two users - Admin and User
   * User can view products and add products but not edit or delete products
   * Admin can do all operations
3. ### Authentication
    * I have used basic Http authentication as this is a prototype. If I spent more time, I would add API key authentication too. 
    * If multiple platforms and services need to be integrated it'd be good to use OAuth authentication
    #### Method: Pass Base64 encoded Authorization parameter in request header. On decoding it returns username and encrypted password
    #### bcrypt is used to hash the password
4. React (without Create-React-App) is used to create the UI. 
   #### parcel-bundler is used as bundling/packaging library as this is a very small app and parcel can be used out of the box (no configuration)
   
## Testing
1. The API has been tested using Postman and from the UI

## Note
1. Automated tests - I haven't been able to write tests yet. Will add it in some time.
2. This has only been tested locally and haven't been deployed to Azure
3. Known-issue - In the UI, click on edit and click on cancel. Editing is cancelled but changes to modified item remain until refreshed. Something to do with state management.
