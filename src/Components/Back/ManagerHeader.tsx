import { useEffect } from "react";
import { useForm } from "react-hook-form";
function ManagerHeader({
  headerData,
  handleUpdateHeader,
}: {
  headerData: any;
  handleUpdateHeader: any;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { video: "" },
  });

  // 編輯資料
  const onSubmit = (data: any) => {
    console.log(data);
    const currentData = {
      video: data.video,
    };
    handleUpdateHeader(headerData[0].uid, currentData);
  };
  useEffect(() => {
    reset(headerData[0]);
  }, [headerData]);
  return (
    <div className="miniForm p-4">
      <h3>編輯 Header 內容</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            影片位置
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="video"
            {...register("video", { required: true })}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            儲存
          </button>
          <button
            type="reset"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManagerHeader;
