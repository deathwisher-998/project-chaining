"use client";

import { useEffect, useState } from "react";

interface propsTypes {
    data: any;
}

export default function WithdrawSection({ data }: propsTypes) {
    const [withdrawList, setWithdrawList] = useState();

    useEffect(() => {

    }, []);

    return (
        <>
            <section className="w-full mx-auto">
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    <div className="btn-color-by-logo-1 rounded-md p-2 mx-4 text-center">
                        <h1 className="font-bold text-white text-xl">
                        </h1>
                        <h2 className="text-white">Balance</h2>
                    </div>
                    <div className="btn-color-by-logo-1 rounded-md p-2 mx-4 text-center">
                        <h1 className="font-bold text-white text-xl">
                        </h1>
                        <h2 className="text-white">Total Withdraw</h2>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="overflow-scroll shadow-sm border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                                    <th className="px-6 py-4 text-sm font-semibold">ID</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-sm font-semibold">PaymentType</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Request On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
