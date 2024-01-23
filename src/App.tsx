import { useState } from "react";
import TableRow, {
  IFrequency,
  IMonth,
  IWeek,
} from "./Components/TableRow/TableRow";
import Modal from "./Components/Modal/modal";
import useInput from "./Components/useInput";
import data from "./Components/data.json";
import Icon from "../src/assets/Icon.svg";

export interface IData {
  id: number;
  title: string;
  description: string;
  subject: string;
  frequency: IFrequency;
  repeat: IMonth | IWeek;
  schedule: string;
}

const App = () => {
  const [search, setSearch] = useInput("");
  const [title, setTitle] = useInput("");
  const [description, setDescription] = useInput("");
  const [subject, setSubject] = useInput("");
  const [schedule, setSchedule] = useInput("");
  const [frequency, setFrequency] = useState<IFrequency>();
  const [repeat, setRepeat] = useState<IWeek | IMonth>();
  const [items, setItems] = useState<IData[]>(data as unknown as IData[]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(0);
  const [addItemError, setAddItemError] = useState(false);

  const handleAddItem = () => {
    if (!title || !description || !schedule || !subject || !frequency) {
      setShowAddModal(true);
      setAddItemError(true);
    } else {
      const id = Math.floor(Math.random() * 1000) + 1;
      const newItem = {
        id,
        title,
        description,
        frequency,
        repeat,
        subject,
        schedule,
      };

      setItems([...items, newItem as IData]);
      setTitle("");
      setDescription("");
      setSubject("");
      setFrequency("" as unknown as IFrequency);
      setRepeat("" as unknown as IMonth);
      setSchedule("");
      setShowAddModal(false);
    }
  };

  const handleEditItem = () => {
    const index = items.findIndex((item) => item.id === editId);
    items[index].title = title;
    items[index].description = description;
    items[index].subject = subject;
    items[index].frequency = frequency as IFrequency;
    items[index].repeat = repeat as IWeek | IMonth;
    items[index].schedule = schedule;

    setItems([...items]);
    setTitle("");
    setDescription("");
    setSubject("");
    setFrequency("" as unknown as IFrequency);
    setSchedule("");
    setShowEditModal(false);
  };

  const handleDeleteItem = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleOpenEditModal = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setSubject(item.subject);
      setSchedule(item.schedule);
      setFrequency(item.frequency);
      setEditId(id);
      setShowEditModal(true);
    }
  };

  const filterItems = () => {
    const query = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.schedule.toLowerCase().includes(query)
    );
  };

  return (
    <div className="min-h-[calc(100vh-48px)]">
      <div className="h-[48px] w-[100%]"></div>
      <div className="flex h-full w-full">
        <div className="bg-[#391E5A] w-[72px] h-[100vh - 48px]"></div>
        <div className="bg-purple-100 shadow-lg w-full min-h-screen">
          <div className="h-[40px] w-[100%] bg-[#3C1E5A1A] mb-[20px]"></div>
          <div className="flex items-center justify-between px-[56px] py-[34px] w-full">
            <div className="flex items-center">
              <input
                type="text"
                className="px-4 py-2"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-[#391E5A] px-3 py-2 rounded-md text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onClick={() => setShowAddModal(true)}
            >
              <div className="flex items-center gap-2">
                <img src={Icon} alt="Example Icon" />
                <div>Add</div>
              </div>
            </button>
          </div>
          <div className="px-[56px] py-2 overflow-x-auto w-full">
            <table className="w-max-[1300px] table-auto w-full mb-5">
              <thead>
                <tr className="text-left bg-[#3C1E5A1A]">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2 w-max-[558px]">Description</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Schedule</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filterItems().map((item) => (
                  <TableRow
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    subject={item.subject}
                    schedule={item.schedule}
                    frequency={item.frequency}
                    onEdit={() => handleOpenEditModal(item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                    repeat={item.repeat}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal title="Add Schedule" show={showAddModal}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={title}
                onChange={setTitle}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={subject}
                onChange={setSubject}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Frequency
              </label>
              <select
                id="frequency"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={
                  frequency as string | number | readonly string[] | undefined
                }
                onChange={(e) =>
                  setFrequency(e.target.value as unknown as IFrequency)
                }
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Repeat
              </label>
              <select
                id="frequency"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={
                  repeat as string | number | readonly string[] | undefined
                }
                onChange={(e) =>
                  setFrequency(e.target.value as unknown as IFrequency)
                }
              >
                {frequency === ("Monthly" as unknown as IFrequency) ? (
                  <>
                    <option value="First Monday">First Monday</option>
                    <option value="Last Friday">Last Friday</option>
                  </>
                ) : frequency === ("Weekly" as unknown as IFrequency) ? (
                  <>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </>
                ) : (
                  <option value="All Days">All Days</option>
                )}
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="schedule"
                className="block text-sm font-medium text-gray-700"
              >
                Schedule
              </label>
              <input
                type="text"
                id="schedule"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={schedule}
                onChange={setSchedule}
              />
            </div>
          </div>
          {addItemError && (
            <div className="pt-2 text-red-700">
              *Empty Fields are not allowed
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="w-full inline-flex justify-center shadow-sm px-4 py-2 bg-[#FFF] border-2 border-[#391E5A] text-base font-medium text-[#391E5A] hover:bg-[#391E5A] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setShowAddModal(false);
                setTitle("");
                setDescription("");
                setSubject("");
                setSchedule("");
              }}
            >
              Cancle
            </button>
            <button
              type="button"
              className="inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-[#391E5A] text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleAddItem}
            >
              Done
            </button>
          </div>
        </Modal>
        <Modal title="Edit Schedule" show={showEditModal}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={title}
                onChange={setTitle}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={subject}
                onChange={setSubject}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Frequency
              </label>
              <select
                id="frequency"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={
                  frequency as string | number | readonly string[] | undefined
                }
                onChange={(e) =>
                  setFrequency(e.target.value as unknown as IFrequency)
                }
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Repeat
              </label>
              <select
                id="frequency"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={
                  repeat as string | number | readonly string[] | undefined
                }
                onChange={(e) =>
                  setRepeat(e.target.value as unknown as IWeek | IMonth)
                }
              >
                {frequency === ("Monthly" as unknown as IFrequency) ? (
                  <>
                    <option value="First Monday">First Monday</option>
                    <option value="Last Friday">Last Friday</option>
                  </>
                ) : frequency === ("Weekly" as unknown as IFrequency) ? (
                  <>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </>
                ) : (
                  <option value="All Days">All Days</option>
                )}
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="schedule"
                className="block text-sm font-medium text-gray-700"
              >
                Schedule
              </label>
              <input
                type="text"
                id="schedule"
                className="mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={schedule}
                onChange={setSchedule}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="w-full inline-flex justify-center shadow-sm px-4 py-2 bg-[#FFF] border-2 border-[#391E5A] text-base font-medium text-[#391E5A] hover:bg-[#391E5A] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setShowEditModal(false);
                setTitle("");
                setDescription("");
                setSubject("");
                setSchedule("");
              }}
            >
              Cancle
            </button>
            <button
              type="button"
              className="inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-[#391E5A] text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleEditItem}
            >
              Update
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
