import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup } from "@/components";
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-3">
          <img alt={data.name} className="w-40 rounded-xl object-cover" src={getImageUrl(data.profile_path)} />
          <Button onClick={() => navigate(-1)} variant="primary">
            ← Back
          </Button>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">{data.name}</h1>
          <p className="text-gray-400 text-sm">{data.birthday}</p>
          <p className="text-gray-300 leading-relaxed">{data.biography}</p>
        </div>
      </div>
      <div className="space-y-4">
        <LinkGroup
          options={[
            { label: "Career", to: "career" },
            { label: "Images", to: "images" },
          ]}
        />
        <Outlet />
      </div>
    </section>
  );
};
