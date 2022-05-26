<template>

    <NavBar></NavBar>
    <DataTable :value="users" :paginator="true" class="p-datatable-customers" :rows="10" dataKey="id" :rowHover="true"
        :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 25, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" responsiveLayout="scroll">
        <template #header>
            <div class="flex justify-content-between align-items-center">
                <h2 class="m-0">Users</h2>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText placeholder="Keyword Search" />
                </span>
            </div>
        </template>
        <template #empty>
            No users found.
        </template>
        <Column field="_id" header="Name">
        </Column>
        <Column field="first_name" header="Name">
        </Column>
        <Column field="last_name" header="Last name">
        </Column>
        <Column field="email" header="Last name">
        </Column>
        <Column header="Actions">
            <template #body="{ data, index }">
                <div class="flex justify-content-evenly">
                    <Button label="Activate" :loading="loadingSave && loadingSaveIndex == index" iconPos="right"
                        :disabled="data.role == 2" @click="activateUser(data, index)"></Button>
                    <Button icon="pi pi-times" :loading="loadingDelete && loadingDeleteIndex == index"
                        class="p-button-rounded p-button-danger p-button-outlined"
                        @click="deleteUser(data, index)"></Button>
                </div>
            </template>
        </Column>
    </DataTable>

</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../components/NavBar.vue";
export default {
    name: "Users",
    components: {
        NavBar
    },
    data() {
        return {
            loading: false,
            loadingSave: false,
            loadingSaveIndex: null,
            loadingDelete: false,
            loadingDeleteIndex: null
        }
    },
    computed: {
        ...mapGetters(['users'])
    },
    async mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            this.loading = true;
            await this.$store.dispatch("users");
            this.loading = false;
        },
        async activateUser(user, index) {
            this.loadingSave = true;
            this.loadingSaveIndex = index;
            await this.$store.dispatch('activateUser', user._id);
            this.loadingSave = false;
            this.loadingSaveIndex = null;
            this.getUsers();
        },
        async deleteUser(user, index) {
            this.loadingDelete = true;
            this.loadingDeleteIndex = index;
            await this.$store.dispatch('deleteUser', user._id);
            this.loadingDelete = false;
            this.loadingDeleteIndex = null;
            this.getUsers();
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead>tr>th {
        text-align: left;
    }

    .p-datatable-tbody>tr>td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>