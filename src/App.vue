<template>
  <div id="app" style="height: 100%">
    <div class="container" style="height: 100%">
      <div class="card py-20" style="height: 100%">
        <div class="card-header">
          <div class="row">
            <div class="col-4 text-start py-2">
              <h5 class="card-title">{{ selectedMode }}</h5>
            </div>
            <div class="col py-1">
              <div class="input-group" style="max-width: 350px">
                <input
                  @change="(e)=>inputSearch(e)"
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
              <button class="btn btn-link">
                <i class="bi bi-person-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="h-100">
            <template v-if="selectedMode === 'favourites'">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
              </ul>
            </template>

            <template v-if="selectedMode === 'contact'">
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
                    <div class="col-8 col-md-10 align-items-center text-start">
                      <p>{{ contact.name }}</p>
                      <p>{{ contact.tel }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </template>
          </div>
        </div>
        <div class="card-footer">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <div
                @click="selectMode('favourites')"
                :class="`nav-link ${
                  selectedMode === 'favourites' ? 'active' : ''
                }`"
              >
                <i class="bi bi-star" style="display: block"></i>
                <span> Favourites </span>
              </div>
            </li>
            <li class="nav-item">
              <div
                @click="selectMode('contact')"
                :class="`nav-link ${
                  selectedMode === 'contact' ? 'active' : ''
                }`"
              >
                <i class="bi bi-person-lines-fill" style="display: block"></i>
                <span> Contact </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selectedMode: "contact",
      contactList: [
        {
          name: "A",
          tel: "0909912870",
          profilePic:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/767px-Cat_November_2010-1a.jpg",
        },
      ],
      searchWords: "",
    };
  },
  methods: {
    selectMode(mode) {
      this.selectedMode = mode;
    },
    searchContact(){
      const searchInput = document.getElementById('search-input')
      this.searchWords = searchInput.value
    },
    inputSearch(e){
      console.log(e.target.value)
      if(!e.target.value){
        this.searchWords = ''
      }
    },
    filterContact() {
      const findItems = this.contactList.filter((contact) => {
        const findKey = `${contact.name}-${contact.tel}`;
        const capitalizedFindKey = findKey.toUpperCase();
        const capitalizeSearchword = this.searchWords.toUpperCase();
        if (capitalizedFindKey.includes(capitalizeSearchword)) {
          return true;
        }else{
          return false
        }
      });
      return findItems;
    },
  },
  computed: {
    displayContactList() {
      if(this.searchWords.length>0){
        console.log(this.searchWords)
        const contacts =this.filterContact()
        return contacts
      }else{
        console.log('empty')
        return this.contactList
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

.nav-link {
  color: black;
  cursor: pointer;
}

.profile-image {
  width: 75px;
  height: 75px;
}
</style>
