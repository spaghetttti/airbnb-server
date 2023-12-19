# airbnb-server

version française 
Ce backend comprend un serveur Express.js servant de backend à l'application. Il gère divers itinéraires pour les utilisateurs, les propriétés et les locations à l'aide de contrôleurs, de routeurs, de services et de modèles. L'application utilise une base de données MySQL pour stocker et récupérer les données relatives aux utilisateurs, aux propriétés et aux locations.

### Pile technologique

- **Node.js** : Environnement d'exécution pour exécuter du code JavaScript sur le serveur.
- **Express.js** : framework d'application Web pour Node.js, utilisé pour le routage et la gestion du middleware.
- **MySQL** : Système de base de données relationnelle utilisé pour stocker les données des applications.

### Structure du fichier

La base de code backend est organisée en plusieurs fichiers :

1. **index.ts** : Point d'entrée pour la configuration du serveur Express, définition des routes et du middleware.
2. **Routeurs** :
- **userRoutes.ts** : définit les itinéraires pour les opérations liées à l'utilisateur.
- **propertyRoutes.ts** : définit les itinéraires pour les opérations liées à la
  propriété.
- **rentalRoutes.ts** : Définit les itinéraires pour les opérations liées à la location.

3. **Contrôleurs** :

- **userController.ts** : gère la logique liée à l'utilisateur, y compris les opérations
  d'authentification et CRUD.
- **propertyController.ts** : gère la logique liée aux propriétés et les opérations
  CRUD.
- **rentalController.ts** : gère la logique liée à la location et les opérations CRUD.

4. **Prestations** :
- **userServices.ts** : contient des fonctions permettant d'interagir avec la base de données pour les opérations liées à l'utilisateur.
- **propertyServices.ts** : contient des fonctions permettant d'interagir avec la base de données pour les opérations liées aux propriétés.
- **rentalServices.ts** : Contient des fonctions pour interagir avec la base de données pour les opérations liées à la location.

5. **Modèles** :

- **userModel.ts** : définit la structure et les opérations de base de données pour
  l'entité Utilisateur.
- **propertyModel.ts** : définit la structure et les opérations de base de données
  pour l'entité Property.
- **rentalModel.ts** : définit la structure et les opérations de base de données
  pour l'entité Rental.

6. **Configuration de la base de données** :

- **database.ts** : établit une connexion à la base de données MySQL à l'aide du package `mysql2/promise`.
- **db.config.ts** : fichier de configuration contenant les informations d'identification de la base de données (non fournies ici).

### Fonctionnalité

1. **Opérations utilisateur** :

- **GET /api/users** : Récupère tous les utilisateurs.
- **GET /api/users/:id** : Récupère l'utilisateur par ID.
- **POST /api/users** : Créez un nouvel utilisateur.
- **POST /api/users/register** : Enregistrez un nouvel utilisateur.
- **POST /api/users/login** : Authentifier et connecter un utilisateur.
- **PUT /api/users/:id** : Mettre à jour les informations utilisateur.
- **DELETE /api/users/:id** : Supprimer un utilisateur.

2. **Opérations immobilières** :

- **GET /api/properties** : Récupérez toutes les propriétés ou propriétés filtrées
  en fonction des critères de recherche.
- **GET /api/properties/:id** : Récupère la propriété par ID.
- **POST /api/properties** : Créez une nouvelle propriété.
- **PUT /api/properties/:id** : Mettre à jour les informations sur la propriété.
- **DELETE /api/properties/:id** : Supprimer une propriété.
 
3. **Opérations de location** :

- **GET /api/rentals** : Récupère toutes les locations.
- **GET /api/rentals/location/:id** : Récupérez les locations par ID d'emplacement.
- **GET /api/rentals/property/:id** : Récupérez les locations par ID de propriété.
- **POST /api/rentals** : Créer une nouvelle location.
- **PUT /api/rentals/:id** : Mettre à jour les informations de location.
- **DELETE /api/rentals/:id** : Supprimer une location.

### La gestion des erreurs

- Le backend inclut des mécanismes de gestion des erreurs utilisant des blocs try- catch pour gérer les exceptions et renvoyer les codes d'état HTTP et les messages d'erreur appropriés.
- Les erreurs sont traitées à différents niveaux, tels que les échecs de connexion à la base de données, les problèmes d'exécution des requêtes et les entrées utilisateur non valides.

### Mesures de sécurité

- **Password Hashing** : les mots de passe des utilisateurs sont hachés à l'aide de bcrypt avant d'être stockés dans la base de données.
- **Authentification basée sur les jetons** : l'authentification JWT (JSON Web Token) est utilisée pour la connexion de l'utilisateur, fournissant des jetons pour les demandes authentifiées ultérieures.

---

Absolument! Examinons plus en détail la logique implémentée dans les contrôleurs, les services et les modèles, en nous concentrant particulièrement sur les requêtes complexes au sein des modèles.

### Contrôleurs

#### Contrôleur utilisateur :

- **`getAllUsers`** : récupère tous les utilisateurs de la base de données à l'aide de
  `userService` et répond avec les données récupérées.
- **`registerUser`** : reçoit les données utilisateur, hache le mot de passe et utilise
  `userService` pour créer un nouvel utilisateur dans la base de données.
- **`loginUser`** : gère la connexion de l'utilisateur en vérifiant les informations

d'identification par rapport aux données stockées dans la base de données à l'aide du `u
serService`.

- **`getUserById`** : Récupère un utilisateur par son identifiant à l'aide de
  `userService`.
- **`createUser`, `updateUser`, `deleteUser`** : appelle les fonctions
  `userService` pour les opérations CRUD sur les utilisateurs.

#### Contrôleur de propriété :

- **`getAllProperties`** : Récupère toutes les propriétés de la base de données à l'aide de `propertyService`.
- **`getPropertyById`** : récupère une propriété par son ID à l'aide de `propertyService`.
- **`createProperty`, `updateProperty`, `deleteProperty`** : utilise `propertyService` pour les opérations CRUD sur les propriétés.
- **`getAllProperties` avec paramètres de recherche** : effectue des recherches conditionnelles de propriétés en fonction de divers paramètres reçus dans la requête.

#### Contrôleur de location :

- **`getAllRentals`** : récupère toutes les locations de la base de données à l'aide de `rentalService`.
- **`getRentalByLocationId`, `getRentalByPropertyId`** : Récupère les locations filtrées par emplacement ou ID de propriété à l'aide de `rentalService`.
- **`createRental`, `updateRental`, `deleteRental`** : utilise `rentalService` pour les opérations CRUD de location.
- **`createRental` avec vérification du chevauchement des dates** : Vérifie les locations qui se chevauchent pour une propriété avant de créer une nouvelle location à l'aide d'une requête complexe.

### Prestations de service

#### Service utilisateur :

- **`registerUser`** : hache le mot de passe et crée un nouvel utilisateur dans la
  base de données.
- **`loginUser`** : Récupère un utilisateur par e-mail, vérifie le mot de passe et génère un JWT pour l'authentification.

- **`getAllUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`** : Correspondent aux opérations CRUD sur les utilisateurs.

#### Service immobilier :

- **`getAllProperties`** : récupère toutes les propriétés de la base de données. - **`getPropertyById`** : Récupère une propriété par son ID.
- **`createProperty`, `updateProperty`, `deleteProperty`** : Correspondent aux
  opérations CRUD sur les propriétés.
- **`getSearchedProperties`** : crée et exécute une requête basée sur des
  paramètres de recherche tels que la ville, les chambres, les lits, le prix et la plage de dates.

#### Service de location:

- **`getAllRentals`** : récupère toutes les locations de la base de données.
- **`getRentalByLocationId`, `getRentalByPropertyId`** : Récupérez les locations
  par emplacement ou ID de propriété.
- **`createRental`** : inclut une requête complexe pour vérifier les locations qui se
  chevauchent avant d'ajouter une nouvelle location.
- **`updateRental`, `deleteRental`** : Correspondent aux opérations de mise à
  jour et de suppression sur les locations.

### Des modèles

#### Modèle utilisateur :

- Fournit des requêtes de base de données pour gérer les opérations liées aux
  utilisateurs telles que la récupération d'utilisateurs, la récupération par ID ou par courrier électronique, la création, la mise à jour et la suppression d'utilisateurs.

#### Modèle de propriété :

- **`getAllProperties`** : Récupère toutes les propriétés de la base de données. - **`getPropertyById`** : récupère une propriété par son ID.
- **`createProperty`, `updateProperty`, `deleteProperty`** : Correspondent aux
  opérations CRUD sur les propriétés.
- **`getSearchedProperties`** : construit et exécute une requête basée sur divers paramètres de recherche.

#### Modèle de location :

- **`getAllRentals`** : Récupère toutes les locations de la base de données.
- **`getRentalByLocationId`, `getRentalByPropertyId`** : Récupérez les locations
  par emplacement ou ID de propriété.
- **`createRental`** : vérifie les locations qui se chevauchent avant de créer une
  nouvelle location.
- **`updateRental`, `deleteRental`** : Correspondent aux opérations de mise à
  jour et de suppression sur les locations.

### Requêtes complexes dans les modèles

- **Fonctionnalité de recherche** : ces modèles incluent des requêtes complexes pour gérer les recherches conditionnelles basées sur différents paramètres (par exemple, recherche de propriété par ville, chambres, lits, prix et plage de dates dans le `propertyModel`).
- **Vérification du chevauchement des locations** : Dans le `rentalModel`, la fonction `createRental` inclut une requête pour vérifier les locations qui se chevauchent avant d'insérer une nouvelle location afin d'éviter les conflits dans les périodes de réservation d'une propriété.
  Ces explications donnent un aperçu des fonctions et des requêtes implémentées dans les contrôleurs, les services et les modèles, mettant notamment en évidence les requêtes complexes et les opérations logiques au sein des modèles pour gérer la récupération, la création, la mise à jour et la suppression de données.
  Caractéristiques:
  Modularité : Le code est divisé en fichiers et dossiers distincts en fonction des fonctionnalités (contrôleurs, services, modèles). Chaque composant a sa responsabilité, ce qui rend la base de code plus maintenable et évolutive.
  Séparation des préoccupations : il existe une séparation claire entre la logique métier (dans les services) et la gestion des demandes (dans les contrôleurs). Les modèles gèrent les interactions avec la base de données, en gardant isolée la logique liée à la base de données.

Couche de service : les services agissent comme un intermédiaire entre les contrôleurs et les modèles, encapsulant une logique métier complexe. Les services gèrent le traitement des données, l'interaction avec les modèles et facilitent les opérations CRUD.
Modèles pour l'accès aux données : les modèles sont responsables de la base de données

# airbnb-server

# english version

### Overview

This backend comprises an Express.js server serving as the application's backend. It handles various routes for users, properties, and rentals using controllers, routers, services, and models. The application uses a MySQL database to store and retrieve data related to users, properties, and rentals.

### Technology Stack

- **Node.js**: Runtime environment for executing JavaScript code on the server. - **Express.js**: Web application framework for Node.js, used for routing and
  middleware handling.
- **MySQL**: Relational database system used to store application data.

### File Structure

The backend codebase is organized into several files:

1. **index.ts**: Entry point for the Express server setup, defining routes and middleware.
2. **Routes**:

- **userRoutes.ts**: Defines routes for user-related operations.
- **propertyRoutes.ts**: Defines routes for property-related operations. - **rentalRoutes.ts**: Defines routes for rental-related operations.

3. **Controllers**:

- **userController.ts**: Handles user-related logic, including authentication and
  CRUD operations.
- **propertyController.ts**: Manages property-related logic and CRUD
  operations.
- **rentalController.ts**: Manages rental-related logic and CRUD operations.

4. **Services**:

- **userServices.ts**: Contains functions to interact with the database for user-
  related operations.
- **propertyServices.ts**: Contains functions to interact with the database for property-related operations.

- **rentalServices.ts**: Contains functions to interact with the database for rental-related operations.

5. **Models**:

- **userModel.ts**: Defines the structure and database operations for the User
  entity.
- **propertyModel.ts**: Defines the structure and database operations for the
  Property entity.
- **rentalModel.ts**: Defines the structure and database operations for the
  Rental entity.

6. **Database Configuration**:

- **database.ts**: Establishes a connection to the MySQL database using the `mysql2/promise` package.
- **db.config.ts**: Configuration file holding database credentials (not provided here).

### Functionality

1. **User Operations**:

- **GET /api/users**: Retrieve all users.
- **GET /api/users/:id**: Retrieve user by ID.
- **POST /api/users**: Create a new user.
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Authenticate and log in a user. - **PUT /api/users/:id**: Update user information.
- **DELETE /api/users/:id**: Delete a user.

2. **Property Operations**:

- **GET /api/properties**: Retrieve all properties or filtered properties based on
  search criteria.
- **GET /api/properties/:id**: Retrieve property by ID.
- **POST /api/properties**: Create a new property.
- **PUT /api/properties/:id**: Update property information. - **DELETE /api/properties/:id**: Delete a property.

3. **Rental Operations**:

- **GET /api/rentals**: Retrieve all rentals.
- **GET /api/rentals/location/:id**: Retrieve rentals by location ID.

- **GET /api/rentals/property/:id**: Retrieve rentals by property ID. - **POST /api/rentals**: Create a new rental.
- **PUT /api/rentals/:id**: Update rental information.
- **DELETE /api/rentals/:id**: Delete a rental.

### Error Handling

- The backend includes error handling mechanisms using try-catch blocks to manage exceptions and return appropriate HTTP status codes and error messages.
- Errors are handled at various levels, such as database connection failures, query execution issues, and invalid user input.

### Security Measures

- **Password Hashing**: User passwords are hashed using bcrypt before being stored in the database.
- **Token-Based Authentication**: JWT (JSON Web Token) authentication is used for user login, providing tokens for subsequent authenticated requests.

---

Absolutely! Let's dive deeper into the logic implemented in controllers, services, and models, particularly focusing on complex queries within the models.

### Controllers

#### User Controller:

- **`getAllUsers`**: Fetches all users from the database using the `userService`
  and responds with the retrieved data.
- **`registerUser`**: Receives user data, hashes the password, and uses
  `userService` to create a new user in the database.
- **`loginUser`**: Handles user login by verifying credentials against stored data in
  the database using the `userService`.
- **`getUserById`**: Retrieves a user by their ID using `userService`.
- **`createUser`, `updateUser`, `deleteUser`**: Invoke `userService` functions for
  CRUD operations on users.

#### Property Controller:

- **`getAllProperties`**: Retrieves all properties from the database using `propertyService`.

- **`getPropertyById`**: Fetches a property by its ID using `propertyService`.
- **`createProperty`, `updateProperty`, `deleteProperty`**: Utilizes `propertyService` for CRUD operations on properties.
- **`getAllProperties` with search parameters**: Performs conditional searches for properties based on various parameters received in the query.

#### Rental Controller:

- **`getAllRentals`**: Fetches all rentals from the database using `rentalService`. - **`getRentalByLocationId`, `getRentalByPropertyId`**: Retrieves rentals filtered
  by location or property ID using `rentalService`.
- **`createRental`, `updateRental`, `deleteRental`**: Uses `rentalService` for rental
  CRUD operations.
- **`createRental` with date overlap check**: Checks for overlapping rentals for a
  property before creating a new rental using a complex query.

### Services

#### User Service:

- **`registerUser`**: Hashes the password and creates a new user in the
  database.
- **`loginUser`**: Retrieves a user by email, verifies the password, and generates
  a JWT for authentication.
- **`getAllUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`**:
  Correspond to CRUD operations on users.

#### Property Service:

- **`getAllProperties`**: Fetches all properties from the database.
- **`getPropertyById`**: Retrieves a property by its ID.
- **`createProperty`, `updateProperty`, `deleteProperty`**: Correspond to CRUD
  operations on properties.
- **`getSearchedProperties`**: Builds and executes a query based on search
  parameters like town, rooms, beds, price, and date range.

#### Rental Service:

- **`getAllRentals`**: Fetches all rentals from the database.
- **`getRentalByLocationId`, `getRentalByPropertyId`**: Retrieve rentals by
  location or property ID.

- **`createRental`**: Includes a complex query to check for overlapping rentals before adding a new rental.
- **`updateRental`, `deleteRental`**: Correspond to update and delete operations on rentals.

### Models

#### User Model:

- Provides database queries to handle user-related operations like fetching users,
  fetching by ID or email, creating, updating, and deleting users.

#### Property Model:

- **`getAllProperties`**: Retrieves all properties from the database.
- **`getPropertyById`**: Fetches a property by its ID.
- **`createProperty`, `updateProperty`, `deleteProperty`**: Correspond to CRUD
  operations on properties.
- **`getSearchedProperties`**: Constructs and executes a query based on various
  search parameters.

#### Rental Model:

- **`getAllRentals`**: Retrieves all rentals from the database.
- **`getRentalByLocationId`, `getRentalByPropertyId`**: Fetch rentals by location
  or property ID.
- **`createRental`**: Checks for overlapping rentals before creating a new rental. - **`updateRental`, `deleteRental`**: Correspond to update and delete operations
  on rentals.

### Complex Queries in Models

- **Search Functionality**: These models include complex queries to handle conditional searches based on different parameters (e.g., property search by town, rooms, beds, price, and date range in the `propertyModel`).
- **Rental Overlap Check**: In the `rentalModel`, the `createRental` function includes a query to check for overlapping rentals before inserting a new rental to avoid conflicts in booking periods for a property.
  These explanations give an overview of the functions and queries implemented in the controllers, services, and models, especially highlighting complex queries and logical operations within the models for handling data retrieval, creation, updating, and deletion.
  Characteristics:
  Modularity: The code is divided into separate files and folders based on functionalities (controllers, services, models). Each component has its responsibility, making the codebase more maintainable and scalable.
  Separation of Concerns: There's a clear separation between business logic (in services) and request handling (in controllers). Models handle interactions with the database, keeping database-related logic isolated.
  Service Layer: The services act as an intermediary between controllers and models, encapsulating complex business logic. Services handle data processing, interaction with models, and facilitate CRUD operations.
  Models for Data Access: Models are responsible for database interactions, containing queries and methods related to fetching, creating, updating, and deleting data from the database.
  Router/Controller Interaction: Controllers handle routing and request handling. They parse incoming requests, call the appropriate service functions, and send responses back.
  Error Handling: The code includes error handling mechanisms, such as try-catch blocks, to manage errors gracefully and provide meaningful error messages to clients.
  Code Reusability: Functions within services and models can be reused across different parts of the application, promoting code reusability.
  Architecture Type:
  While not explicitly labeled as any particular architectural style, this codebase appears to follow a "Service-Oriented Architecture" (SOA) approach, emphasizing the use of services to handle business logic and interaction with data models. This approach promotes modularity, reusability, and clear separation of concerns.
