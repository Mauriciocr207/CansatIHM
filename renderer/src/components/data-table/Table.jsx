import { useEffect, useState } from "react";
import usePort from "../../hooks/usePort";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { CSVLink } from "react-csv";
import { IoReload } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";

export default function Table() {
  const { isPortOpen } = usePort();
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [downloadData, setDownloadData] = useState([]);
  const [reloaded, setReloaded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fields = [
    "Id",
    "Tiempo",
    "Temperatura",
    "Presión",
    "Velocidad",
    "Altura",
    "Aceleración",
    "Rotación x",
    "Rotación y",
    "Rotación z",
    "LatCP",
    "LongCP",
    "LatCS",
    "LongCS",
  ];
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    window.cansatApi.dbGetByPage({ page });
    window.cansatApi.dbOnGetByPage((e, data) => {
      setPagination(data.pagination);
      setColumns(data.measurements);
      setTimeout(() => {
        setIsLoading(false);
        setReloaded(false);
      }, 1000);
    });
  }, [reloaded]);

  useEffect(() => {
    if (!isPortOpen && !reloaded) {
      window.cansatApi.dbGetByPage({ page });
      window.cansatApi.dbOnGetByPage((e, data) => {
        setPagination(data.pagination);
        setColumns(data.measurements);
      });
    }
  }, [isPortOpen, page]);

  async function handleCsvClick(e, done) {
    try {
      const result = await window.cansatApi.dbGetAll();
      setDownloadData(result.measurements);
      done(true);
    } catch (error) {
      done(false);
    }
  }

  const onReload = () => setReloaded(true);

  return (
    <>
      <div className="flex justify-end items-center mb-3 mx-5 gap-x-4">
        <CSVLink
          data={downloadData}
          asyncOnClick={true}
          onClick={handleCsvClick}
          filename="cansata_data.csv"
          className="flex items-center gap-3 px-5 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <p className="text-xs">Descarga csv</p>
          <div className="w-4">
            <ArrowDownTrayIcon />
          </div>
        </CSVLink>
        <IoReload
          style={{ cursor: isPortOpen ? "not-allowed" : "pointer" }}
          disabled={isPortOpen ? true : false}
          onClick={onReload}
        />
      </div>
      {isLoading ? (
        <div className="h-[calc(100vh-400px)] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {columns.length === 0 && (
            <h1 className="font-semibold text-center text-xl mt-20 text-slate-500 dark:text-slate-300">
              Parece que no hay datos por ahora :(
            </h1>
          )}
          {columns.length !== 0 && (
            <>
              <div className="relative shadow-lg overflow-x-auto">
                <table className="rounded-xl overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-transparent">
                  <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
                    <tr>
                      {fields.map((field) => (
                        <th key={field} scope="col" className="px-4 py-2">
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {columns.map((data) => (
                      <tr
                        key={data.id}
                        className="border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-xs"
                      >
                        <td className="px-4 py-3.5">{data.id}</td>
                        <td className="px-4 py-3.5">{data.time}</td>
                        <td className="px-4 py-3.5">{data.temperature}</td>
                        <td className="px-4 py-3.5">{data.pressure}</td>
                        <td className="px-4 py-3.5">{data.velocity}</td>
                        <td className="px-4 py-3.5">{data.height}</td>
                        <td className="px-4 py-3.5">{data.aceleration}</td>
                        <td className="px-4 py-3.5">{data.angle_x}</td>
                        <td className="px-4 py-3.5">{data.angle_y}</td>
                        <td className="px-4 py-3.5">{data.angle_z}</td>
                        <td className="px-4 py-3.5">{data.latitude_cp}</td>
                        <td className="px-4 py-3.5">{data.length_cp}</td>
                        <td className="px-4 py-3.5">{data.latitude_cs}</td>
                        <td className="px-4 py-3.5">{data.length_cs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Mostrando {""}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(pagination.page - 1) * pagination.perPage + 1}-
                    {Math.min(
                      pagination.page * pagination.perPage,
                      pagination.count
                    )}
                  </span>
                  {""} de {""}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.count}
                  </span>
                </span>
                <ReactPaginate
                  className="inline-flex -space-x-px rtl:space-x-reverse text-xs h-8"
                  pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  activeLinkClassName="!dark:bg-gray-600 !bg-gray-100"
                  breakClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  pageCount={pagination.pages}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  forcePage={page - 1}
                  previousLabel={
                    <button
                      disabled={page - 1 == 0}
                      onClick={() => setPage((page) => page - 1)}
                      href="#"
                      className={`${
                        page - 1 == 0
                          ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300"
                          : ""
                      } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      Anterior
                    </button>
                  }
                  breakLabel="..."
                  nextLabel={
                    <button
                      disabled={page + 1 > pagination.pages}
                      onClick={() => setPage((page) => page + 1)}
                      href="#"
                      className={`${
                        page + 1 > pagination.pages
                          ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300"
                          : ""
                      } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      Siguiente
                    </button>
                  }
                  onClick={(clickEvent) => {
                    const { nextSelectedPage } = clickEvent;

                    if (nextSelectedPage === undefined) {
                      return false;
                    }
                    // Return false to prevent standard page change,
                    // return false; // --> Will do nothing.
                    // return a number to choose the next page,
                    // return 4; --> Will go to page 5 (index 4)
                    // return nothing (undefined) to let standard behavior take place.

                    setPage(nextSelectedPage + 1);
                    return nextSelectedPage;
                  }}
                />
              </nav>
            </>
          )}
        </>
      )}
    </>
  );
}
