 
 | Scenario name                                          | Status                |
 |--------------------------------------------------------|-----------------------|
 | Put order with correct data should receive code 200    | OK                    |
 | Put order with incorrect data should receive code 401  | UNAUTHORIZED          |
 | Delete order with correct id should receive code 204   | NO_CONTENT            |
 | Delete order with incorrect id should receive code 401 | UNAUTHORIZED          |
 | Login with correct data should receive code 200        | OK                    |
 | Login with incorrect data should receive code 500      | INTERNAL_SERVER_ERROR |
