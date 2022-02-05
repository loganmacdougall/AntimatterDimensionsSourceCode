import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";

Vue.component("ep-multiplier-button", {
  components: {
    PrimaryButton,
    PrimaryToggleButton
  },
  data() {
    return {
      inDoomed: false,
      isAutobuyerActive: false,
      isAutoUnlocked: false,
      isAffordable: false,
      multiplier: new Decimal(0),
      cost: new Decimal(0)
    };
  },
  watch: {
    isAutobuyerActive(newValue) {
      Autobuyer.epMult.isActive = newValue;
    }
  },
  computed: {
    upgrade() {
      return EternityUpgrade.epMult;
    },
    autobuyer() {
      return Autobuyer.epMult;
    },
    classObject() {
      return {
        "o-eternity-upgrade": true,
        "o-eternity-upgrade--available": this.isAffordable,
        "o-eternity-upgrade--unavailable": !this.isAffordable,
        "c-pelle-useless": this.inDoomed
      };
    }
  },
  methods: {
    update() {
      this.inDoomed = Pelle.isDoomed;
      const upgrade = this.upgrade;
      this.isAutoUnlocked = this.autobuyer.isUnlocked;
      this.isAutobuyerActive = this.autobuyer.isActive;
      this.multiplier.copyFrom(upgrade.effectValue);
      this.cost.copyFrom(upgrade.cost);
      this.isAffordable = upgrade.isAffordable;
    },
  },
  template: `
    <div class="l-spoon-btn-group">
      <button :class="classObject" @click="upgrade.purchase()">
        <div v-if="inDoomed">
          This multiplier has no effect while in Doomed
          <br>
          Cost: {{ quantify("Eternity Point", cost, 2, 0) }}
        </div>
        <div v-else>
          Multiply Eternity Points from all sources by {{ formatX(5) }}
          <br>
          Currently: {{ formatX(multiplier, 2, 0) }}
          <br>
          Cost: {{ quantify("Eternity Point", cost, 2, 0) }}
        </div>
      </button>
      <PrimaryButton
        class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
        @click="upgrade.buyMax()"
      >
        Max Eternity Point mult
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutoUnlocked"
        v-model="isAutobuyerActive"
        label="Autobuy EP mult"
        class="l--spoon-btn-group__little-spoon o-primary-btn--small-spoon"
      />
    </div>`
});
