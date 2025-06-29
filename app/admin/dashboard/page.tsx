import connectDB from "@/lib/db";
import Arrangement from "@/models/Arrangement";
import { isAdminRequest } from "@/lib/checkAdmin";
import { redirect } from "next/navigation";
import ArrangementUploadForm from "@/components/ArrangementUploadForm";
import DashboardClient from "@/components/DashboardClient";
import LogoutButton from "@/components/LogoutButton";
import AdminOrdersTable from "@/components/AdminOrdersTable";

export default async function DashboardPage() {
    const isAdmin = await isAdminRequest();
    if (!isAdmin) {
        redirect("/");
    }

    await connectDB();
    const arrangements = await Arrangement.find()
        .sort({ createdAt: -1 })
        .lean();

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 max-w-6xl mx-auto">
            {/* Header with Logout */}
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <LogoutButton />
            </div>
            <div className="space-y-8">
                {/* Other admin sections here */}
                <AdminOrdersTable />
            </div>
            {/* Upload Form */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">
                    Upload New Chart
                </h2>
                <ArrangementUploadForm />
            </section>

            {/* Existing Charts */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Existing Charts</h2>
                <DashboardClient
                    arrangements={JSON.parse(JSON.stringify(arrangements))}
                />
            </section>
        </main>
    );
}
