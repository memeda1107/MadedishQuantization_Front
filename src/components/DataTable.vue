<template>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">新增</a-button>
    <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">
            <template
                v-if="['core', 'pioneer', 'middleArmy', 'numberOfLimitUp', 'middleArmy', 'increase', 'genreTrends', 'persistence'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        style="margin: -5px 0" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="editableData[record.key]">
                        <a-typography-link
                            @click="save(record.key); console.log('Saving key:', record.key)">保存</a-typography-link>
                        <a-popconfirm title="确定取消?" @confirm="cancel(record.key)">
                            <a>取消</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">编辑</a>
                    </span>
                </div>
            </template>
        </template>
    </a-table>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { computed, reactive, ref ,onMounted} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

const props = defineProps({

    id: Number,

})
onMounted(() => {
    init();
    //   getMonthDates()
});

function init() {

axios.get('http://127.0.0.1:5000/api/get_subject', { params: { review_diary_id: props.id } }).then(response => {
                console.log('table。。。。。。。。。。Response:', response)
                for(let i=0;i<response.data.length;i++)
                {
                    dataSource.value.push(response.data[i])
                }
                // data=response;
            })
                .catch(error => {
                    console.error('Error:', error);
                    // 处理错误响应，例如显示错误消息等
                });

}
const columns = [
    {
        title: '核心',
        dataIndex: 'core',
        width: '15%',
    },
    {
        title: '先锋',
        dataIndex: 'pioneer',
        width: '15%',
    },
    {
        title: '中军',
        dataIndex: 'middleArmy',
        width: '15%',
    },
    {
        title: '涨停家数',
        dataIndex: 'numberOfLimitUp',
        width: '5%',
    },
    {
        title: '涨幅',
        dataIndex: 'increase',
        width: '5%',
    },
    {
        title: '题材趋势',
        dataIndex: 'genreTrends',
        width: '15%',
    },
    {
        title: '持续性',
        dataIndex: 'persistence',
        width: '15%',
    },
    {
        title: '操作 ',
        dataIndex: 'operation',
        width: '15%',
    },
];
const data =[];
// for (let i = 0; i < 2; i++) {
//     data.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

const dataSource = ref(data);
const editableData = reactive({});
const count = computed(() => dataSource.value.length + 1);
const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        core: ``,
        pioneer: ``,
        middleArmy: ``,
        numberOfLimitUp: 0,
        increase: 0,
        genreTrends: ``,
        persistence: ``,
        date: null,
        reviewDiaryId: props.id,
    };
    dataSource.value.push(newData);
};
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
    console.log('id', props.id)
    if (!props.id) {
        message.error('请先保存表单！');
        return;
    }
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    debugger;
    console.log('测试。。。。。。。。。。。:', key, data[key - 1]);
    axios.post('http://127.0.0.1:5000/api/addSubject', data[key - 1])
        .then(response => {
            console.log('Response:', response);
            // 处理成功响应，例如显示成功消息等
            message.success('保存成功', 3);
        })
        .catch(error => {
            console.error('Error:', error);
            // 处理错误响应，例如显示错误消息等
        });
    delete editableData[key];
};

// 使用 reactive 定义响应式数据
// const state = reactive({
//   editableData: {}, // 存储正在编辑的行数据
// });

// // 方法定义
// const save = async (key) => {
//   try {
//     console.log('传入的 key:', key);
//     debugger;
//     const rowToSave = state.editableData[key];
//     console.log('cesssssssssssss',rowToSave);
//     if (!rowToSave) return;

//     // 发送请求
//     const response = await axios.post('/api/addSubject', rowToSave);
//     console.log('Response:', response);
//     // 更新数据源
//     const index = dataSource.value.findIndex(item => item.key === key);
//     if (index !== -1) {
//       dataSource[index] = { ...rowToSave };
//     }

//     // 清理状态
//     delete state.editableData[key];
//     message.success('保存成功');

//   } catch (error) {
//     console.error(error);
//     message.error('保存失败');
//   }
// };
const cancel = key => {
    delete editableData[key];
};
</script>
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>