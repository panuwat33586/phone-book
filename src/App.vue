<template>
  <div id="app" style="height: 100%">
    <div class="container" style="height: 100%">
      <div class="card py-20" style="height: 100%">
        <div class="card-header">
          <div class="row">
            <div class="col-4 text-start py-2">
              <h5 class="card-title">Contact</h5>
            </div>
            <div class="col py-1">
              <div class="input-group" style="max-width: 350px">
                <input
                  @change="(e) => inputSearch(e)"
                  id="search-input"
                  type="text"
                  class="form-control"
                  placeholder="name/tel"
                />
                <button
                  @click="searchContact"
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div class="col-auto py-2">
              <button @click="addContact" class="btn btn-link">
                <i class="bi bi-person-plus"></i>
              </button>
            </div>
            <div class="col-auto py-2">
              <button @click="triggerFavorite" class="btn btn-link">
                <i :class="`bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}`" :style="`color:${isFavorite?'yellow':''}`"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="h-100">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(contact, $contactIndex) in displayContactList"
              >
                <div class="row">
                  <div class="col-4 col-md-2 text-start">
                    <img
                      :src="contact.profilePic"
                      class="profile-image rounded-circle"
                      alt="profile-image"
                    />
                  </div>
                  <div class="col-4 col-md-6 align-items-center text-start">
                    <p>{{ contact.name }}</p>
                    <p>{{ contact.tel }}</p>
                  </div>
                  <div class="col-2 col-md-2 align-items-center text-start">
                    <button
                      @click="() => modifyFavoriteItem(contact.id)"
                      class="btn btn-warning"
                    >
                      <i
                        :class="`bi ${
                          contact.isFavorite ? 'bi-star-fill' : 'bi-star'
                        }`"
                      ></i>
                    </button>
                  </div>
                  <div class="col-2 col-md-2 align-items-center text-start">
                    <button
                      @click="() => deleteContact(contact.id)"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="card-footer">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <div class="nav-link">
                <i class="bi bi-star" style="display: block"></i>
                <span> Favourites </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {v4} from 'uuid';
const defaultProfilePic ='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/767px-Cat_November_2010-1a.jpg'
export default {
  name: "App",
  data() {
    return {
      isFavorite: false,
      contactList: [
        {
          id: "1",
          name: "A",
          tel: "0909912870",
          profilePic:defaultProfilePic,
          isFavorite: false,
        },
      ],
      searchWords: "",
    };
  },
  methods: {
    triggerFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    addContact(){
      const name = window.prompt('Contact name')
      const tel = window.prompt('Tel No.')
      let pic = window.prompt('Your profile picture')
      const profilePic = pic || defaultProfilePic
      const contact = {
        id:v4(),
        name,
        tel,
        profilePic,
        isFavorite:false
      }
      this.contactList.push(contact)
    },
    modifyFavoriteItem(itemId) {
      this.contactList = this.contactList.map((contact) => {
        if (contact.id === itemId) {
          contact.isFavorite = !contact.isFavorite;
        }
        return contact;
      });
    },
    searchContact() {
      const searchInput = document.getElementById("search-input");
      this.searchWords = searchInput.value;
    },
    inputSearch(e) {
      if (!e.target.value) {
        this.searchWords = "";
      }
    },
    deleteContact(itemId) {
      const result = window.confirm("Do you want to delete this contact");
      if (result) {
        this.contactList = this.contactList.filter((contact) => {
          return contact.id !== itemId;
        });
      }
    },
    filterContact(contactList) {
      const findItems = contactList.filter((contact) => {
        const findKey = `${contact.name}-${contact.tel}`;
        const capitalizedFindKey = findKey.toUpperCase();
        const capitalizeSearchword = this.searchWords.toUpperCase();
        if (capitalizedFindKey.includes(capitalizeSearchword)) {
          return true;
        } else {
          return false;
        }
      });
      return findItems;
    },
  },
  computed: {
    displayContactList() {
      let contactList = [...this.contactList];
      if (this.isFavorite) {
        contactList = contactList.filter((contact) => contact.isFavorite);
      }

      if (this.searchWords.length > 0) {
        const contacts = this.filterContact(contactList);
        return contacts;
      } else {
        console.log(contactList);
        return contactList;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body {
  height: 100%;
}
html {
  height: 100%;
}

.profile-image {
  width: 75px;
  height: 75px;
}
</style>
