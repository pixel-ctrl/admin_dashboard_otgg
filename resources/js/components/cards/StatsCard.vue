<template>
    <div class="bg-gray-900 rounded-lg p-4 border border-emerald-900/30">
        <div class="flex flex-col">
            <span class="text-gray-300 text-sm">{{ title }}</span>

            <div class="mt-1">
                <span class="text-white text-2xl font-bold">{{ value }}</span>
            </div>

            <div class="flex items-center mt-1">
                <span
                    :class="`${isPositive ? 'text-emerald-500' : 'text-red-500'} text-sm font-medium flex items-center`">
                    <!-- Up arrow for positive change -->
                    <svg v-if="isPositive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-4 h-4 mr-1">
                        <path fill-rule="evenodd"
                            d="M12 7a1 1 0 01-1 1H9v9a1 1 0 01-2 0V8H5a1 1 0 01-.707-1.707l3-3a1 1 0 011.414 0l3 3A1 1 0 0112 7z"
                            clip-rule="evenodd" />
                    </svg>

                    <!-- Down arrow for negative change -->
                    <svg v-if="!isPositive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-4 h-4 mr-1">
                        <path fill-rule="evenodd"
                            d="M12 13a1 1 0 01-1 1H9v-9a1 1 0 00-2 0v9H5a1 1 0 01-.707-1.707l3-3a1 1 0 011.414 0l3 3A1 1 0 0112 13z"
                            clip-rule="evenodd" />
                    </svg>

                    {{ isPositive ? '' : '-' }}{{ Math.abs(changePercentage) }}%
                </span>

                <span class="text-gray-400 text-xs ml-2">from yesterday</span>
            </div>
        </div>

        <!-- Sparkline chart -->
        <div class="mt-4 h-10">
            <svg class="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <!-- The path will be rendered dynamically based on chartData -->
                <path :d="sparklinePath" fill="none" :stroke="gradientId" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />

                <!-- Gradient definitions -->
                <defs>
                    <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :stop-color="startColor" />
                        <stop offset="100%" :stop-color="endColor" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatsCard',
    props: {
        // Required props
        title: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        changePercentage: {
            type: [Number, String],
            required: true,
            validator: (val) => !isNaN(parseFloat(val))
        },
        // Optional props with defaults
        chartData: {
            type: Array,
            default: () => []
        },
        startColor: {
            type: String,
            default: '#10b981' // Emerald/green color
        },
        endColor: {
            type: String,
            default: '#0ea5e9' // Cyan/blue color
        }
    },
    computed: {
        // Determine if change is positive or negative
        isPositive() {
            return parseFloat(this.changePercentage) >= 0;
        },

        // Generate unique gradient ID
        gradientId() {
            return `gradient-${this._uid}`;
        },

        // Generate SVG path for sparkline
        sparklinePath() {
            if (!this.chartData || this.chartData.length === 0) {
                return '';
            }

            const data = this.chartData;
            const width = 100;
            const height = 30;
            const min = Math.min(...data);
            const max = Math.max(...data);
            const range = max - min || 1;

            return data.map((value, index) => {
                const x = (index / (data.length - 1)) * width;
                const y = height - ((value - min) / range * height * 0.8) - 2; // Leave some padding
                return `${index === 0 ? 'M' : 'L'}${x},${y}`;
            }).join(' ');
        }
    }
};
</script>