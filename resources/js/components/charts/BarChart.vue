<template>
    <svg class="w-full h-60" viewBox="0 0 300 200">
        <!-- Y-axis labels -->
        <text v-for="(value, index) in yLabels" :key="index" x="20" :y="170 - (index * 30)"
            class="text-xs fill-gray-400">
            {{ value }}
        </text>

        <!-- Bars -->
        <g v-for="(month, index) in months" :key="month">
            <!-- Each bar's position is calculated dynamically based on index -->
            <rect :x="45 + (index * 45)" y="0" :height="170" width="25" fill="transparent"
                @mouseenter="highlightIndex = index" @mouseleave="highlightIndex = null" />

            <rect :x="45 + (index * 45)" :y="170 - (returnValues[index] / 60 * 150)"
                :height="returnValues[index] / 60 * 150" width="25"
                :fill="returnValues[index] > 40 ? '#10b981' : '#5eead4'" rx="2" />

            <!-- X-axis labels -->
            <text :x="45 + (index * 45) + 12" y="190" text-anchor="middle" class="text-xs fill-gray-400">
                {{ month }}
            </text>
        </g>

        <!-- Highlight percentage -->
        <g v-if="highlightIndex !== null">
            <rect :x="45 + (highlightIndex * 45) - 5" :y="170 - (returnValues[highlightIndex] / 60 * 150) - 35"
                width="35" height="25" rx="12" fill="rgba(45, 45, 45, 0.9)" />
            <text :x="45 + (highlightIndex * 45) + 12" :y="170 - (returnValues[highlightIndex] / 60 * 150) - 18"
                text-anchor="middle" class="text-sm fill-white font-bold">
                {{ returnValues[highlightIndex] }}%
            </text>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'ReturnsBarChart',
    props: {
        // Props to receive data from parent component
        chartData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            yLabels: ['10', '20', '30', '40', '50', '60',],
            returnValues: [0, 0, 0, 0, 0, 0], // Initialize with zeros
            highlightIndex: null // No highlighting by default
        };
    },
    mounted() {
        // Initialize with empty data
        // The parent component will need to provide data through the chartData prop
    },
    watch: {
        chartData: {
            handler(newData) {
                if (newData && Object.keys(newData).length > 0) {
                    // Process incoming data from parent
                    if (newData.returns) {
                        this.returnValues = newData.returns;
                    }

                    if (newData.highlight !== undefined) {
                        this.highlightIndex = newData.highlight;
                    }

                    if (newData.months) {
                        this.months = newData.months;
                    }
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>