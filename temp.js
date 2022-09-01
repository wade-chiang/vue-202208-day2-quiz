    const filtedStops = computed(() => {
      return isStopsFilter.value ? uBikeStops.value.filter(d => d.sbi > 0) : uBikeStops.value;
    });

    
    const filtedStops = computed(() => {
      return isStopsFilter.value ? uBikeStops.value.filter(d => d.sbi > 0) : uBikeStops.value;
      return uBikeStops.value.filter(d => d.sna.includes(stopSearch.value))
    });