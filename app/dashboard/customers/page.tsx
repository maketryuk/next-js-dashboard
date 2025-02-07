import { Metadata } from 'next';
import {Suspense} from "react";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import {fetchFilteredCustomers} from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
	title: 'Customers',
};

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const customers = await fetchFilteredCustomers(query);

	return (
		<div className="w-full">
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
				<CustomersTable customers={customers}></CustomersTable>
			</Suspense>
		</div>
	);
}
