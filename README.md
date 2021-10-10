# valet-car-parking-system

## Background
* Design valet car parking system to manage a parking space and its revenue as vehicles enter/exit 
* The first line indicates the number of parking slots for Cars and Motorcycles respectively in the parking lot.
* For each subsequent line, vehicle may:
    * enter the space with `Enter <motorcycle|car> <vehicle number> <entryTime>`
    * exit the space with `Exit <vehicle number> <exitTime>`
* For more details, See the section on [`Flow Structure`](#flowStructure)    

## To run the program: 
Prerequisites: Node and NPM

Input File: `src/input/input-file.js`

Scripts: 
1. npm install
2. npm run start

*(optional) npm run test*

## Project Structure
```
📦valet-car-parking-system
 ┣ 📂src
 ┃ ┗ 📜index.js
 ┃ ┗ 📂constants
 ┃ ┗ 📂entities
 ┃ ┗ 📂handler
 ┃ ┗ 📂input
 ┣ 📜.gitignore
 ┣ 📜 readme.md
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

## Entitles
1. ParkingLot:
    - carLot & motorCycleLot in array structure. Eg. [0,0,0]
2. Vehicle:  
    - contains vehicle details such as car type, car plate number, parking lot assigned, and entry time stamp

## [Flow Structure](#flowStructure)
1. Read line by line from input-file
2. First Line: create new `ParkingLot` object and initialize available parking lot in array structure
3. Subsequent Lines:
    1. if first word of the line = 'Enter' -> create new `Vehicle` and store it in the first available car lot of `ParkingLot` 
    2. if first word of the line = 'Exit' -> find car plate number from `Vehicle` and remove it from the car lot of `ParkingLot`
    
## Error Handling
Error that has been handled includes: 
- [x] Input Error
- [x] Invalid car type upon entering
- [x] Invalid vehicle plate upon exiting
- [x] Exit Time before entry time error 


## Unit Test Coverage

- Automated unit test for all methods
<img width="579" alt="Screenshot 2021-10-10 at 3 27 44 PM" src="https://user-images.githubusercontent.com/26644922/136686753-cb78b0b3-6531-4bc5-ac2d-9a691b4170e8.png">

- Manual test on index.js to simulate different input files


## Future Enhancement
- [] Accept more than 1 input-file 
- [] Unit test on index.js
- [] OutputHandler to handle all console.log

