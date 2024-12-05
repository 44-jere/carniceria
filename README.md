# Delicias Cárnicas Cobán
#### Video Demo:  [Watch the Demo](https://youtu.be/x1TajMkF59U)
#### Description:
### Project Description: "Delicias Cárnicas Cobán"

#### Objective
The objective of this project is to provide customers with an online platform to browse available products from a butchery, view detailed product information, make purchases, and manage their orders through a user-friendly web interface.

#### Project Components

1. **Flask Framework**:
   - **Flask**: The primary framework used to build the web application.
   - **Flask-Session**: Used to handle user sessions, allowing session data to be stored on the file system.

2. **SQLite Database**:
   - **SQL**: Utilizes the CS50 SQL library to interact with the SQLite database, which stores information about customers, products, and orders.

3. **HTML Files**:
   - **HTML Templates**: Uses HTML templates rendered by Flask to display web pages, such as the main page, product details, and the shopping cart.

4. **Main Functions**:

   - **verify_client_exists**: This function checks if a client already exists in the database using their phone and email. If not, it creates a new client record.

   - **obtain_orders**: This function retrieves a user's orders, filtering by delivery and cancellation status.

   - **index**: The main route of the application that displays all available products in the butchery.

   - **details**: A route that shows the details of a specific product when the user clicks on it.

   - **shopping**: A route that shows the user's confirmed and delivered orders, allowing them to manage their purchases.

   - **process**: A route that processes a purchase, verifying the client's existence and updating the orders in the database.

   - **setID**: A route that sets the user ID in the session after verifying or creating a client in the database.

#### Workflow

1. **Product Browsing**:
   - Users can view the list of available products on the main page.
   - They can click on a product to see its details on the details page.

2. **Order Management**:
   - Users can add products to their cart and make a purchase.
   - The application verifies if the user already exists in the database and creates a new record if necessary.
   - Orders are stored in the database, and users can view and manage their orders on the shopping page.

3. **Session Management**:
   - The application uses sessions to store the user ID and maintain session information between different HTTP requests.

#### Security and Best Practices

- **Validations**: Input validations are performed to ensure that the entered data is correct and to prevent errors.
- **Error Handling**: Errors are handled, and clear error messages are provided to users.
- **Modularization**: The code is organized into functions to improve maintainability and readability.

This project demonstrates how to build a functional web application using Flask and SQLite, covering essential functionalities such as user, product, and order management, as well as session implementation and validations.
