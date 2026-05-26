import React, { useState, useEffect } from "react";
import AddPhotoModal from "./AddPhotoModal"; // Import the new modal component
import AddRoleModal from "./AddRoleModal"; // Import the new role modal component

// Mock Data
const INITIAL_GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Clinic Interior",
    desktopTitle: "Clinic Main Entrance",
    imgUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Therapy Session",
    desktopTitle: "Rehabilitation Area",
    imgUrl:
      "https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Rehab Equipment",
    desktopTitle: "Consultation Room",
    imgUrl:
      "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Team Photo",
    desktopTitle: "Our Expert Team",
    imgUrl:
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=800",
  },
];

const INITIAL_JOB_ROLES = [
  {
    id: 1,
    title: "Senior Physiotherapist",
    department: "Clinical",
    type: "Full-time",
    status: "Active",
    posted: "Posted 2 days ago",
    applicants: 3,
    icon: "medical_services",
    statusColor: "emerald",
  },
  {
    id: 2,
    title: "Front Desk Coordinator",
    department: "Administration",
    type: "Full-time",
    status: "Active",
    posted: "Posted 1 week ago",
    applicants: 12,
    icon: "person",
    statusColor: "emerald",
  },
  {
    id: 3,
    title: "Sports Rehab Specialist",
    department: "Clinical",
    type: "Part-time",
    status: "Active",
    posted: "Posted 3 days ago",
    applicants: 8,
    icon: "exercise",
    statusColor: "emerald",
  },
  {
    id: 4,
    title: "Rehab Assistant",
    department: "Clinical",
    type: "Part-time",
    status: "Draft",
    posted: "Draft saved yesterday",
    applicants: 0,
    icon: "accessibility_new",
    statusColor: "slate",
  },
];

export default function GalleryCareer({ activeTab: propTab = "gallery" }) {
  const [activeTab, setActiveTab] = useState(propTab);
  const [photos, setPhotos] = useState(INITIAL_GALLERY_PHOTOS);
  const [roles, setRoles] = useState(INITIAL_JOB_ROLES);
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Sync internal state with the activeView from AdminDashboard
  useEffect(() => {
    setActiveTab(propTab);
  }, [propTab]);

  const handleOpenAddPhotoModal = () => {
    setIsAddPhotoModalOpen(true);
  };

  const handleCloseAddPhotoModal = () => {
    setIsAddPhotoModalOpen(false);
  };

  const handleSaveNewPhoto = ({ title, imgUrl }) => {
    const newPhoto = {
      id: Date.now(),
      title: title,
      desktopTitle: title,
      imgUrl: imgUrl,
    };
    setPhotos([newPhoto, ...photos]);
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm("Are you sure you want to delete this photo from the gallery?")) {
      setPhotos(photos.filter((photo) => photo.id !== id));
    }
  };

  const handleOpenAddRoleModal = () => {
    setIsAddRoleModalOpen(true);
  };

  const handleCloseAddRoleModal = () => {
    setIsAddRoleModalOpen(false);
    setEditingRole(null);
  };

  const handleOpenEditRoleModal = (role) => {
    setEditingRole(role);
    setIsAddRoleModalOpen(true);
  };

  const handleSaveNewRole = (newRoleData) => {
    if (editingRole) {
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id ? { ...r, ...newRoleData } : r
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        ...newRoleData,
        status: "Active",
        posted: "Posted just now",
        applicants: 0,
        icon: newRoleData.department === "Clinical" ? "medical_services" : "person",
        statusColor: "emerald",
      };
      setRoles([newRole, ...roles]);
    }
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this job role?")) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setRoles(
      roles.map((role) => {
        if (role.id === id) {
          const isActivating = role.status === "Draft";
          return {
            ...role,
            status: isActivating ? "Active" : "Draft",
            statusColor: isActivating ? "emerald" : "slate",
          };
        }
        return role;
      })
    );
  };

  return (
    <>
    <div className="flex-1 overflow-y-auto bg-[#f6f6f8] text-slate-900 font-sans">
      {/* MAIN CONTENT AREA */}
      <main className="p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-8 lg:space-y-12">
        {/* ----- GALLERY SECTION ----- */}
        {activeTab === "gallery" && (
          <section>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold lg:font-black text-slate-900 dark:text-white tracking-tight">
                  <span className="lg:hidden">Manage Photos</span>
                  <span className="hidden lg:inline">Gallery Management</span>
                </h2>
                <p className="hidden lg:block text-slate-500 dark:text-slate-400 text-sm">
                  Update and manage website visual content
                </p>
              </div>
              {/* Mobile Add Button */}
              <button
                onClick={handleOpenAddPhotoModal}
                className="lg:hidden flex items-center gap-1 text-sm font-semibold text-[#135bec] bg-[#135bec]/10 px-3 py-1.5 rounded-lg"
              >
                <span className="material-symbols-outlined text-lg">
                  add_a_photo
                </span>{" "}
                Add
              </button>
              {/* Desktop Add Button */}
              <button
                onClick={handleOpenAddPhotoModal}
                className="hidden lg:flex items-center gap-2 bg-[#135bec] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-lg">
                  add_a_photo
                </span>{" "}
                Add Photo
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-xl overflow-hidden aspect-square bg-slate-200 dark:bg-slate-800 border border-[#135bec]/5 shadow-sm hover:shadow-xl transition-all"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${photo.imgUrl}')` }}
                  ></div>

                  {/* Mobile Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                  <div className="absolute bottom-3 left-3 right-3 lg:hidden">
                    <p className="text-white text-sm font-semibold truncate">
                      {photo.title}
                    </p>
                  </div>
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white lg:hidden">
                    <span className="material-symbols-outlined text-base">
                      more_vert
                    </span>
                  </button>

                  {/* Desktop Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex flex-col justify-end p-4">
                    <p className="text-white font-semibold mb-3">
                      {photo.desktopTitle}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white text-slate-900 text-xs font-bold py-2 rounded-lg hover:bg-slate-100 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="w-10 bg-red-500 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ----- CAREERS SECTION ----- */}
        {activeTab === "careers" && (
          <section>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold lg:font-black text-slate-900 dark:text-white tracking-tight">
                  <span className="lg:hidden">Active Job Roles</span>
                  <span className="hidden lg:inline">Careers Management</span>
                </h2>
                <p className="hidden lg:block text-slate-500 dark:text-slate-400 text-sm">
                  Post and manage current job openings
                </p>
              </div>
              <button className="lg:hidden text-sm font-semibold text-[#135bec]">
                View All
              </button>
              <button 
                onClick={handleOpenAddRoleModal}
                className="hidden lg:flex items-center gap-2 bg-[#135bec] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-lg">
                  person_add
                </span>{" "}
                Add Role
              </button>
            </div>

            {/* Mobile List View */}
            <div className="space-y-3 lg:hidden">
              {roles.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#135bec]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#135bec]">
                        {job.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{job.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {job.type} • {job.applicants} Applicants
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOpenEditRoleModal(job)}
                    className="p-2 text-slate-400 hover:text-[#135bec]"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-slate-900 border border-[#135bec]/10 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-[#135bec]/10">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#135bec]/5">
                    {roles.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-[#135bec]/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            {job.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {job.posted}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${job.department === "Clinical" ? "bg-[#135bec]/10 text-[#135bec]" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}
                          >
                            {job.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                          {job.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(job.id)}
                            title="Click to toggle status"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium transition-all hover:ring-2 hover:ring-offset-1 hover:ring-[#135bec]/20 ${
                              job.statusColor === "emerald"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${job.statusColor === "emerald" ? "bg-emerald-500" : "bg-slate-400"}`}
                            ></span>
                            {job.status}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleOpenEditRoleModal(job)}
                              className="p-2 text-slate-400 hover:text-[#135bec] transition-colors"
                            >
                              <span className="material-symbols-outlined">
                                edit
                              </span>
                            </button>
                            <button 
                              onClick={() => handleDeleteRole(job.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>
                  Showing {roles.filter((j) => j.status === "Active").length}{" "}
                  active job roles
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-[#135bec]/20 rounded hover:bg-white transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-[#135bec]/20 rounded hover:bg-white transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>

    <AddPhotoModal
      isOpen={isAddPhotoModalOpen}
      onClose={handleCloseAddPhotoModal}
      onSave={handleSaveNewPhoto}
    />

    <AddRoleModal
      isOpen={isAddRoleModalOpen}
      onClose={handleCloseAddRoleModal}
      onSave={handleSaveNewRole}
      initialData={editingRole}
    />
    </>
  );
}
