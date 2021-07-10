<template>
    <div v-if="personality.name == 'N/A'">
        <h3>{{ personality_name }} Behaviour: N/A</h3>
    </div>
    <div v-else>
        <h3>
            {{ personality_name }} Behaviour:
            {{ personality.name }}
            {{ personality.type }}
        </h3>

        <p><strong>Key Strength</strong></p>
        <ul>
            <li v-for="(desc, i) in personality.char.key_strengths" :key="i">
                {{ desc }}
            </li>
        </ul>

        <p>
            <strong>Improve Effectiveness By</strong>
        </p>
        <ul>
            <li
                v-for="(desc, i) in personality.char.improve_effectiveness_by"
                :key="i"
            >
                {{ desc }}
            </li>
        </ul>

        <p><strong>Tendencies</strong></p>
        <ul>
            <li>
                Goal:
                {{ personality.char.tendencies.goal }}
            </li>
            <li>
                Judges:
                {{ personality.char.tendencies.judges }}
            </li>
            <li>
                Influence:
                {{ personality.char.tendencies.influence }}
            </li>
            <li>
                Value to Org:
                {{ personality.char.tendencies.value_to_org }}
            </li>
            <li>
                Overuses:
                {{ personality.char.tendencies.overuses }}
            </li>
            <li>
                When Under Stress:
                {{ personality.char.tendencies.when_under_stress }}
            </li>
            <li>
                Fears:
                {{ personality.char.tendencies.fears }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        personality: {
            type: Object,
            required: true,
        },
        personality_name: {
            type: String,
            required: true,
        },
    },
};
</script>