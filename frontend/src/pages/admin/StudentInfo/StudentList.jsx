import React, { useMemo, useState } from "react";
import useStudentStore from "../../../store/useStudentStore";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender
} from "@tanstack/react-table";

const StudentList = () => {
  const students = useStudentStore((state) => state.students);
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(() => students, [students]);

  const columns = useMemo(() => [
    {
      header: "Roll No",
      cell: (info) => info.row.index + 1
    },
    {
      header: "Name",
      cell: (info) =>
        `${info.row.original.firstName} ${info.row.original.lastName}`
    },
    {
      header: "Gender",
      accessorKey: "gender"
    },
    {
      header: "Courses Enrolled",
      cell: (info) =>
        info.row.original.courses
          ?.map((course) => course.courseName)
          .join(", ") || "None"
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="p-6 w-full h-full">

      {/* Header + search */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1">Directory</p>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Student List</h1>
        </div>
        <div className="flex items-center gap-2 bg-[#13161e] border border-white/5 hover:border-white/10 rounded-xl px-3 py-2 w-56 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#475569">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search students..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-transparent outline-none border-none text-slate-300 text-[13px] placeholder-slate-600 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13161e] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-white/5 bg-[#0d0f14]">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.1em] text-slate-500 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                {row.getVisibleCells().map((cell, ci) => (
                  <td key={cell.id} className={`px-5 py-3.5 text-[13px] ${ci === 0 ? 'text-slate-500 font-mono' : ci === 1 ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                    {ci === 3 ? (
                      <div className="flex flex-wrap gap-1">
                        {(cell.getValue() || "None").toString().split(", ").map((c, i) => (
                          <span key={i} className="px-2 py-0.5 bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 rounded-md text-[11px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
          <p className="text-[12px] text-slate-600">
            Page <span className="text-slate-400 font-medium">{table.getState().pagination.pageIndex + 1}</span> of <span className="text-slate-400 font-medium">{table.getPageCount()}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[#0d0f14] border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[#0d0f14] border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;