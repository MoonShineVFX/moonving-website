import { useForm } from "react-hook-form";
function AddCategory({ handleCreateCategory }: { handleCreateCategory: any }) {
  const { register, handleSubmit } = useForm();

  // 新增資料
  const onSubmit = (data: any) => {
    console.log(data);

    // 表單資料成為 JSON 資料
    const currentData = {
      id: Date.now().toString(36),
      name: data.name,
      name_cht: data.name_cht,
      time_added: new Date().toISOString(),
      sort_num: "0",
    };
    handleCreateCategory(currentData);
  };
  return (
    <div className="miniForm p-4">
      <h3>新增分類</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="mb-3 space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            英文名稱
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-3 space-y-2">
          <label
            htmlFor="name_cht"
            className="block text-sm font-medium text-gray-700"
          >
            中文名稱
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="name_cht"
            {...register("name_cht", { required: true })}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            新增
          </button>
          <button
            type="reset"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            重設
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
