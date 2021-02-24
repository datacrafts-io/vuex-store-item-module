import { find, maxBy, isEmpty } from "lodash-es"

const accounts = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Anna", age: 25 },
  { id: 3, name: "Den", age: 34 },
  { id: 4, name: "Kate", age: 18 },
  { id: 5, name: "Sam", age: 33 }
]

const handleCreateAccount = params => {
  if (isEmpty(params.name)) return

  const id = maxBy(accounts, "id").id + 1

  accounts.push({ id, name: params.name })
}

class Api {
  get(baseURI, params = {}) {
    switch (baseURI) {
      case "/accounts":
        return { data: accounts }
      case "/accounts/item":
        return find(accounts, ["id", params.id])
    }  
  }

  post(baseURI, params = {}) {
    switch (baseURI) {
      case "/accounts":
        handleCreateAccount(params)

        return { data: accounts }
    }
  }
}

const client = new Api()

export default client
