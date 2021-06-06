/* eslint-disable no-useless-escape */
<template>
<div class="invalid">
    <p v-if="!correctLength">length must be >= 8</p>
    <p v-if="!hasUpperCase">password must contain at least one uppercase</p>
    <p v-if="!hasLowerCase">password must contain at least one lowercase</p>
    <p v-if="!hasSpecialChar">password must contain at least one special char </p>
    <p v-if="!hasNumber">password must contain at least one number</p>
</div>
</template>
<script>
export default {
  props: ["password"],
  data() {
    return {
      correctLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasSpecialChar: false,
      hasNumber: false,
      hasNoSpace:false
    };
  },
  watch: {
    password() {
      this.correctLength = this.password.length >= 8;
      this.hasNumber = /\d/.test(this.password);
      this.hasLowerCase = /[a-z]/.test(this.password);
      this.hasUpperCase = /[A-Z]/.test(this.password);
      // eslint-disable-next-line no-useless-escape
      this.hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
      this.hasNoSpace = !/\s/g.test(this.password)
      if(this.correctLength&&this.hasNumber&&this.hasLowerCase&&this.hasUpperCase&&this.hasSpecialChar) {
        this.$emit('validationComplation')
      }
      const validator = {
          length: this.correctLength,
          hasNum : this.hasNumber,
          hasUpper: this.hasUpperCase,
          hasLow: this.hasLowerCase,
          hasSpecial:this.hasSpecialChar,
      }
      this.$store.dispatch('passworValidation', validator)
    },
  },
};
</script>

<style scoped>
.invalid {
    color: red;
    margin: 0;
    padding: 0;
}
.invalid p {
    margin: 0;
    padding: 0;
}
</style>
