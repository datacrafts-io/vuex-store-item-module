import { find } from "lodash-es"

const accounts = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Anna", age: 25 },
  { id: 3, name: "Den", age: 34 },
  { id: 4, name: "Kate", age: 18 },
  { id: 5, name: "Sam", age: 33 }
]

class Api {
  get(baseURI, params = {}) {
    switch (baseURI) {
      case "/accounts":
        return { data: accounts }
      case "/accounts/item":
        return find(accounts, ["id", params.id])
    }  
  }
}

const client = new Api()

export default client
