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
            <template #body="{data}">
                <Button label="Activate" :disabled="data.role == 2"></Button>
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
        }
    },
    method: {
        logout() {
            console.log('logout');
        }
    },
    computed: {
        ...mapGetters(['users'])
    },
    async mounted() {
        this.loading = true;
        await this.$store.dispatch("users");
        this.loading = false;
    }
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