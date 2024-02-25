import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const createItemUser = ({
  id,
  title,
  description,
  location,
  categories,
  imageUrl,
  startDate,
  endDate,
  createdAt,
  updatedAt,
  acceptedApplicants,
  neededApplicants,
  requiredHours,
  posterId,
  completed,
  poster,
  applications,
}) => {
  return {
    title: title,
    description: description,
    header: <Skeleton image={imageUrl} />,
    link: "/dashboard/jobs/" + id,
    completed: completed,
    neededApplicants: neededApplicants,
    acceptedApplicants: acceptedApplicants,
    data: {
      id,
      title,
      description,
      location,
      categories,
      imageUrl,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      acceptedApplicants,
      neededApplicants,
      requiredHours,
      posterId,
      completed,
      poster,
      applications,
    },
  };
};

export const createItemPoster = ({
  id,
  title,
  description,
  location,
  categories,
  imageUrl,
  startDate,
  endDate,
  createdAt,
  updatedAt,
  acceptedApplicants,
  neededApplicants,
  requiredHours,
  posterId,
  completed,
  poster,
  applications,
}) => {
  return {
    title: title,
    description: description,
    header: <Skeleton image={imageUrl} />,
    icon: completed ? (
      <CompletedIcon green={true} />
    ) : (
      <OnGoingIcon blue={true} />
    ),
    link: "/dashboard/jobs/" + id,
    completed: completed,
    data: {
      id,
      title,
      description,
      location,
      categories,
      imageUrl,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      acceptedApplicants,
      neededApplicants,
      requiredHours,
      posterId,
      completed,
      poster,
      applications,
    },
  };
};

export const CompletedIcon = ({ green = false }) => {
  return <IoMdDoneAll style={{ color: green ? "green" : "" }} />;
};

export const OnGoingIcon = ({ blue = false }) => {
  // return <AiOutlineLoading3Quarters className="animate-spin" />;
  return <AiOutlineLoading3Quarters className={`${blue && "text-blue-500"}`} />;
};

const Skeleton = ({ image }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    {image && (
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
    )}
  </div>
);

export const isUserPoster = (user) => {
  return user && user.type === 2;
};
