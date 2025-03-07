import { useEffect } from "react";
import { useForm } from "react-hook-form";

//firebase 連線
import db from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";

function EditCategory({
  handleUpdateCategory,
  uid,
}: {
  handleUpdateCategory: any;
  uid: string;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", name_cht: "" },
  });
  // const [cateData, setCateData] = useState<any>({});

  // 編輯資料
  const onSubmit = (data: any) => {
    console.log(data);
    const currentData = {
      name: data.name,
      name_cht: data.name_cht,
    };
    // console.log(uid,currentData)
    handleUpdateCategory(uid, currentData);
  };
  const getADoc = async (uid: string) => {
    const docRef = doc(db, "category", uid);
    const docSnap = await getDoc(docRef);
    // setCateData(docSnap.data());
    // console.log(docSnap.data())
    reset(docSnap.data());
  };
  useEffect(() => {
    getADoc(uid);
  }, [uid]);
  return (
    <div className="miniForm p-4">
      <h3>編輯分類</h3>
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
            儲存
          </button>
          <button
            type="reset"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
