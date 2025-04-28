<template>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
    <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
            <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
                <div>
                    <a-input
                            v-if="editableData[record.key]"
                            v-model:value="editableData[record.key][column.dataIndex]"
                            style="margin: -5px 0"
                    />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
                    <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
                </div>
            </template>
        </template>
    </a-table>
</template>
<script setup>
    import { cloneDeep } from 'lodash-es';
    import {computed, reactive, ref } from 'vue';
    const columns = [
        {
            title: '核心',
            dataIndex: 'name',
            width: '15%',
        },
        {
            title: '先锋',
            dataIndex: 'age',
            width: '15%',
        },
        {
            title: '中军',
            dataIndex: 'address',
            width: '15%',
        },
        {
            title: '涨停家数',
            dataIndex: 'address',
            width: '10%',
        },
        {
            title: '涨幅',
            dataIndex: 'address',
            width: '10%',
        },
        {
            title: '题材趋势',
            dataIndex: 'address',
            width: '20%',
        },
        {
            title: '持续性',
            dataIndex: 'address',
            width: '40%',
        },
        {
            title: '操作 ',
            dataIndex: 'operation',
        },
    ];
    const data = [];
    for (let i = 0; i < 2; i++) {
        data.push({
            key: i.toString(),
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    const dataSource = ref(data);
    const editableData = reactive({});
    const count = computed(() => dataSource.value.length + 1);
    const handleAdd = () => {
        const newData = {
            key: `${count.value}`,
            name: `Edward King ${count.value}`,
            age: 32,
            address: `London, Park Lane no. ${count.value}`,
        };
        dataSource.value.push(newData);
    };
    const edit = key => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = key => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
    };
    const cancel = key => {
        delete editableData[key];
    };
</script>
<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }
</style>