<template>
  <header>
    <nav>
      <div>Nations</div>
    </nav>
    <h1>Know your World</h1>
    <input type="text" v-model="searchTerm" placeholder="e.g germany" />
    <button @click="filteredValue">Search</button>
  </header>
  <main>
    <section class="section" v-if="show && error == ''">
      <article v-for="(nation, index) in nations" :key="index">
        <h2>{{ nation.name.common }}</h2>
        <a :href="nation.maps.googleMaps" class="maps"
          ><i class="fa-solid fa-map"></i
        ></a>
        <p>Capital City: {{ nation.capital[0] }}</p>

        <p>Language: {{ Object.values(nation.languages)[0] }}</p>
        <p>Population: {{ nation.population }} inhabitants</p>

        <img :src="nation.flags.svg" alt="" loading="lazy" />
      </article>
    </section>
    <div v-if="!show && error == ''">
      <section
        v-for="country in countries"
        class="searched"
        :key="country.common"
      >
        <article>
          <h2>{{ country.name.common }}</h2>
          <img :src="country.flags.svg" alt="" loading="lazy" />
          <div>
            <p>{{ country.capital[0] }}</p>
            <p>Language: {{ Object.values(country.languages)[0] }}</p>
            <p>
              Population:<br />
              {{ parseInt(country.population) / 1000 }} tsd
            </p>
            <a :href="country.maps.googleMaps" class="maps"
              ><i class="fa-solid fa-map"></i
            ></a>
          </div>
        </article>
      </section>
    </div>
    <section v-if="!show && error != ''" class="section-error">
      <h2>{{ this.error }}</h2>
    </section>
  </main>

  <footer>NuBreedCodes</footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      countries: [],
      show: true,
      searchTerm: '',
      error: '',
      showModal: false,
    }
  },
  computed: {
    nations() {
      return this.$store.getters.countries
    },
  },
  methods: {
    ...mapActions(['fetchAllCountries']),
    filteredValue() {
      console.log(this.nations)
      if (this.searchTerm === '') return this.nations
      else {
        this.show = false
        const inputValue =
          this.searchTerm.charAt(0).toUpperCase() + this.searchTerm.slice(1)
        const filtered = this.$store.getters.countries.filter((country) =>
          country.name.common.includes(inputValue)
        )
        if (filtered.length > 0) {
          this.countries = filtered
        } else {
          this.error = 'Country not found, Please enter a valid search.'
        }
      }
    },
  },
  created() {
    this.fetchAllCountries()
  },
}
</script>
