<template>
    <div class="relative h-56">
        <!-- Y-axis labels -->
        <div class="absolute bottom-6 left-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>150K</span>
            <span>125K</span>
            <span>100K</span>
            <span>75K</span>
            <span>50K</span>
            <span>25K</span>
        </div>

        <!-- Chart area -->
        <svg class="w-full h-full pl-12 mt-10" preserveAspectRatio="none" viewBox="0 0 1000 400">
            <!-- Line path -->
            <path :d="linePath" fill="none" :stroke="lineColor" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" class="filter drop-shadow-md" />

            <!-- Gradient fill beneath line -->
            <path :d="`${linePath} L 1000,400 L 0,400 Z`" :fill="areaGradient ? 'url(#areaGradient)' : 'none'"
                opacity="0.1" />

            <!-- Gradient definitions -->
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" :stop-color="lineColor" stop-opacity="0.5" />
                    <stop offset="100%" :stop-color="lineColor" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>

        <!-- X-axis labels -->
        <div class="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500">
            <span v-for="month in months" :key="month">{{ month }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SalesAnalyticsChart',
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        },
        period: {
            type: String,
            default: 'yearly'
        },
        lineColor: {
            type: String,
            default: '#0ea5e9' // Default cyan/blue color as shown in the image
        },
        areaGradient: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            salesData: []
        };
    },
    computed: {
        linePath() {
            if (!this.salesData || this.salesData.length === 0) return '';

            const maxValue = Math.max(...this.salesData);
            const minValue = Math.min(...this.salesData);
            const range = maxValue - minValue;

            // Generate the SVG path based on the data points
            return this.salesData.map((value, index) => {
                const x = (index / (this.salesData.length - 1)) * 1000;
                // Scale Y to fit within the viewBox (leaving some padding at top/bottom)
                const y = 400 - ((value - minValue) / range * 350 + 25);
                return `${index === 0 ? 'M' : 'L'}${x},${y}`;
            }).join(' ');
        }
    },
    watch: {
        chartData: {
            handler(newData) {
                if (newData && Object.keys(newData).length > 0) {
                    // Process incoming data from parent
                    if (newData.sales) {
                        this.salesData = newData.sales;
                    }

                    if (newData.months) {
                        this.months = newData.months;
                    }
                }
            },
            deep: true,
            immediate: true
        },
        period: {
            handler(newPeriod) {
                // In a real implementation, this would trigger fetching new data based on the period
                this.$emit('period-changed', newPeriod);
            }
        }
    },
    methods: {
        selectPeriod(period) {
            this.$emit('update:period', period);
        }
    }
};
</script>