import React, { useState, useEffect, useRef } from "react";

const initialSubjects = [
  { name: "DBMS", icon: "🗄️", attended: 28, total: 40, color: "#DCEBFF" },
  { name: "Data Structures", icon: "🌳", attended: 32, total: 40, color: "#E0F4EC" },
  { name: "Digital Logic", icon: "💡", attended: 24, total: 30, color: "#FFF0D9" },
  { name: "Mathematics", icon: "∑", attended: 27, total: 36, color: "#EEE6FF" },
];

const initialTasks = [
  { id: 1, title: "Revise DBMS notes", detail: "Database Management", done: false },
  { id: 2, title: "Practise DSA questions", detail: "Data Structures", done: false },
  { id: 3, title: "Complete DLCD assignment", detail: "Digital Logic", done: true },
];

const initialProfile = {
  name: "Harsimar Kaur",
  branch: "Information Technology",
  college: "Guru Tegh Bahadur Institute of Technology",
  year: "2nd Year",
  semester: "3rd Semester",
  enrollment: "",
  photo: "",
};

const days = [
  { key: "mon", name: "Monday" },
  { key: "tue", name: "Tuesday" },
  { key: "wed", name: "Wednesday" },
  { key: "thu", name: "Thursday" },
  { key: "fri", name: "Friday" },
];

const initialTimetable = [
  { time: "09:00", end: "10:00", mon: "Free", tue: "DM", wed: "DM", thu: "DLCD", fri: "DS" },
  { time: "10:00", end: "11:00", mon: "CM", tue: "DS", wed: "DS Lab / CM Lab", thu: "DS", fri: "CM" },
  { time: "11:00", end: "12:00", mon: "DLCD", tue: "OOPs", wed: "DS Lab / CM Lab", thu: "CM", fri: "DLCD" },
  { time: "12:00", end: "12:30", mon: "Break", tue: "Break", wed: "Break", thu: "Break", fri: "Break" },
  { time: "12:30", end: "13:30", mon: "DLCD Lab / DS Lab", tue: "CM", wed: "DS", thu: "DM", fri: "CM Lab / OOPs Lab" },
  { time: "13:30", end: "14:30", mon: "DLCD Lab / DS Lab", tue: "OOPs Lab", wed: "DLCD", thu: "DLCD Lab", fri: "CM Lab / OOPs Lab" },
  { time: "14:30", end: "15:30", mon: "DM", tue: "DLCD Lab", wed: "OOPs", thu: "DLCD Lab", fri: "OOPs" },
];

const subjectInfo = {
  DBMS: { full: "Database Management Systems", color: "#DCEBFF", icon: "🗄️" },
  DS: { full: "Data Structures", color: "#E0F4EC", icon: "🌳" },
  CM: { full: "Computational Mathematics", color: "#EEE6FF", icon: "∑" },
  DM: { full: "Discrete Mathematics", color: "#FBE4F0", icon: "🔢" },
  DLCD: { full: "Digital Logic and Circuit Design", color: "#FFF0D9", icon: "💡" },
  OOPs: { full: "Object-Oriented Programming", color: "#DFF3FA", icon: "💻" },
};

const navItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Attendance", icon: "▥" },
  { name: "Timetable", icon: "▦" },
  { name: "Notes", icon: "▤" },
  { name: "Assignments", icon: "☑" },
];

const css = `
* { box-sizing:border-box; }
body { margin:0; }
button,input,select { font:inherit; }
.cm-app { min-height:100vh; background:#F2F6FC; color:#233653; font-family:'DM Sans','Segoe UI',Arial,sans-serif; }
.cm-sidebar { width:245px; background:#172B4D; color:white; padding:27px 17px; display:flex; flex-direction:column; flex-shrink:0; }
.cm-brand { font-size:22px; font-weight:800; letter-spacing:-.6px; padding:0 9px; }
.cm-brand-mark { display:inline-flex; align-items:center; justify-content:center; width:35px; height:35px; border-radius:12px; background:#8CB8FF; color:#172B4D; margin-right:9px; }
.cm-nav { width:100%; border:0; border-radius:11px; padding:13px 14px; display:flex; gap:13px; align-items:center; text-align:left; background:transparent; color:#D0DBEC; cursor:pointer; font-size:14px; margin:4px 0; }
.cm-nav:hover { background:#243D63; color:white; }
.cm-nav.active { background:#E4EEFF; color:#1C3D70; font-weight:700; }
.cm-main { flex:1; min-width:0; padding:31px 35px 40px; max-width:1600px; }
.cm-top { display:flex; align-items:center; justify-content:space-between; gap:18px; margin-bottom:27px; }
.cm-title { font-size:27px; font-weight:800; letter-spacing:-.8px; margin:0 0 7px; overflow-wrap:anywhere; }
.cm-muted { color:#7A8BA5; font-size:13px; line-height:1.6; }
.cm-avatar { width:48px; height:48px; flex-shrink:0; border-radius:50%; background:#DFE9FC; color:#294A7D; display:flex; align-items:center; justify-content:center; font-weight:800; border:2px solid white; overflow:hidden; }
.cm-avatar img { width:100%; height:100%; object-fit:cover; }
.cm-avatar-button { border:0; background:transparent; padding:0; cursor:pointer; border-radius:50%; }
.cm-card { background:white; border:1px solid #E8EEF7; border-radius:18px; padding:21px; box-shadow:0 5px 18px #23365308; min-width:0; }
.cm-grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:20px; }
.cm-span-12 { grid-column:span 12; }
.cm-span-8 { grid-column:span 8; }
.cm-span-7 { grid-column:span 7; }
.cm-span-6 { grid-column:span 6; }
.cm-span-5 { grid-column:span 5; }
.cm-span-4 { grid-column:span 4; }
.cm-section-title { font-size:16px; font-weight:800; margin:0 0 17px; }
.cm-kicker { text-transform:uppercase; font-size:10px; font-weight:800; letter-spacing:1.1px; color:#6D82A1; }
.cm-id { background:linear-gradient(115deg,#E4EEFF,#D5E5FF); border:1px solid #D0E1FF; border-radius:18px; padding:22px; display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:145px; }
.cm-id h3 { font-size:20px; margin:10px 0 5px; }
.cm-btn { border:0; border-radius:10px; padding:11px 15px; background:#3569B7; color:white; cursor:pointer; font-weight:700; font-size:12px; }
.cm-btn:hover { background:#285697; }
.cm-btn-light { background:white; color:#3569B7; border:1px solid #D6E3F8; }
.cm-next { background:linear-gradient(135deg,#FFF,#F1F6FF); border:1px solid #DFE9F8; }
.cm-next-name { font-size:26px; font-weight:800; margin:10px 0; }
.cm-pill { display:inline-flex; padding:5px 9px; background:#E5F4ED; color:#278361; border-radius:7px; font-size:10px; font-weight:800; }
.cm-update { background:#FFF7E8; border:1px solid #F7E8C8; border-radius:15px; padding:17px; }
.cm-subject { display:flex; align-items:center; gap:12px; padding:13px; border:1px solid #EDF1F7; border-radius:13px; background:#FCFDFF; cursor:pointer; width:100%; text-align:left; color:#233653; }
.cm-subject-icon { width:43px; height:43px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
.cm-subject-name { font-size:13px; font-weight:800; }
.cm-progress { height:7px; border-radius:20px; background:#E9EFF7; overflow:hidden; margin-top:12px; }
.cm-progress-fill { height:100%; border-radius:20px; }
.cm-stat { padding:19px; border-radius:15px; border:1px solid #E8EEF7; background:white; height:100%; }
.cm-stat-icon { font-size:20px; margin-bottom:13px; }
.cm-stat-value { font-size:26px; font-weight:800; }
.cm-stat-label { color:#7A8BA5; font-size:12px; margin-top:5px; }
.cm-table-wrap { width:100%; overflow-x:auto; border:1px solid #E7EDF6; border-radius:12px; }
.cm-table { width:100%; min-width:650px; border-collapse:separate; border-spacing:0; font-size:11px; }
.cm-table th { background:#F4F7FC; color:#6B7E9B; font-size:10px; text-transform:uppercase; padding:13px 11px; text-align:left; }
.cm-table td { padding:12px 11px; border-top:1px solid #EEF2F8; background:white; }
.cm-table th:first-child,.cm-table td:first-child { position:sticky; left:0; background:#F4F7FC; z-index:1; font-weight:700; white-space:nowrap; }
.cm-table td.current { background:#E4EEFF; color:#234E8C; font-weight:800; }
.cm-task { display:flex; gap:12px; align-items:flex-start; padding:13px 0; border-bottom:1px solid #EEF2F8; }
.cm-check { width:19px; height:19px; accent-color:#3569B7; cursor:pointer; flex-shrink:0; margin-top:2px; }
.cm-task-done { color:#9AA7B9; text-decoration:line-through; }
.cm-inputs { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; margin-top:17px; }
.cm-label { display:block; font-size:12px; font-weight:700; color:#52647C; }
.cm-input { display:block; width:100%; margin-top:7px; padding:11px; border:1px solid #D6E3F8; border-radius:9px; font-size:14px; color:#233653; background:#F7FAFF; }
.cm-status { padding:12px; margin-top:13px; border-radius:10px; font-size:12px; line-height:1.6; }
.cm-class-card { border:1px solid #E7EDF6; border-radius:14px; padding:15px; margin-bottom:11px; background:#FCFDFF; }
.cm-class-card.now { border:2px solid #78A8F2; background:#EAF2FF; }
.cm-class-card.next { border:2px solid #92D4BA; background:#EDFAF4; }
.cm-class-time { font-size:12px; color:#6D82A1; font-weight:800; }
.cm-class-name { font-size:16px; font-weight:800; margin:7px 0; }
.cm-tag { display:inline-block; font-size:10px; font-weight:800; padding:5px 8px; border-radius:7px; background:#DCEBFF; color:#285697; }
.cm-profile-top { display:flex; gap:18px; align-items:center; padding:22px; background:linear-gradient(120deg,#E4EEFF,#F7FAFF); border:1px solid #D0E1FF; border-radius:16px; margin-bottom:20px; }
.cm-profile-avatar { width:90px; height:90px; border-radius:50%; background:#C7DBFA; border:4px solid white; color:#244A80; display:grid; place-items:center; overflow:hidden; font-size:27px; font-weight:800; flex-shrink:0; }
.cm-profile-avatar img { width:100%; height:100%; object-fit:cover; }
.cm-profile-form { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
.cm-profile-field { min-width:0; }
.cm-profile-field.full { grid-column:1 / -1; }
.cm-profile-actions { display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap; margin-top:22px; }
.cm-notes-layout { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,2fr); gap:18px; }
.cm-note-item { width:100%; text-align:left; border:1px solid #E8EEF7; border-radius:12px; background:#FCFDFF; padding:14px; color:#233653; cursor:pointer; }
.cm-note-item.selected { border:2px solid #78A8F2; background:#EEF5FF; }
.cm-note-title { font-weight:800; font-size:14px; overflow-wrap:anywhere; }
.cm-note-preview { color:#7A8BA5; font-size:11px; line-height:1.5; margin-top:7px; overflow-wrap:anywhere; }
.cm-toolbar { display:flex; gap:6px; flex-wrap:wrap; padding:9px; background:#F4F7FC; border:1px solid #DCE5F2; border-radius:10px 10px 0 0; }
.cm-toolbar button { min-width:34px; padding:7px 9px; border:1px solid #D6E3F8; border-radius:7px; background:white; color:#294A7D; cursor:pointer; font-weight:700; font-size:12px; }
.cm-editor { min-height:230px; padding:14px; border:1px solid #DCE5F2; border-top:0; border-radius:0 0 10px 10px; background:#fff; color:#233653; font-size:14px; line-height:1.7; outline:none; overflow-wrap:anywhere; }
.cm-editor:focus { box-shadow:0 0 0 3px #DCEBFF; }
.cm-editor h1,.cm-editor h2,.cm-editor h3 { color:#233653; }
.cm-editor ul,.cm-editor ol { padding-left:24px; }
.cm-search { width:100%; padding:11px 13px; border:1px solid #D6E3F8; border-radius:10px; background:#F7FAFF; color:#233653; }
.cm-attachment { display:flex; align-items:center; gap:10px; padding:10px; border:1px solid #E8EEF7; border-radius:10px; margin-top:9px; overflow-wrap:anywhere; }
.cm-bottom-nav { display:none; }
@media(max-width:1050px) { .cm-sidebar { width:205px; } .cm-main { padding:25px 22px; } .cm-span-8,.cm-span-7,.cm-span-5,.cm-span-4 { grid-column:span 6; } .cm-notes-layout { grid-template-columns:1fr; } }
@media(max-width:680px) {
 .cm-app { padding-bottom:75px; } .cm-sidebar { display:none; }
 .cm-main { padding:22px 15px 28px; } .cm-title { font-size:23px; }
 .cm-grid { gap:13px; }
 .cm-span-8,.cm-span-7,.cm-span-6,.cm-span-5,.cm-span-4,.cm-span-12 { grid-column:span 12; }
 .cm-card { padding:17px; border-radius:16px; }
 .cm-id { padding:18px; } .cm-next-name { font-size:24px; }
 .cm-bottom-nav { display:flex; position:fixed; z-index:10; bottom:0; left:0; right:0; background:white; border-top:1px solid #E4EBF5; padding:8px 2px; justify-content:space-around; box-shadow:0 -4px 16px #172B4D0A; }
 .cm-bottom-nav button { border:0; background:transparent; color:#7A8BA5; font-size:9px; display:flex; flex-direction:column; gap:4px; align-items:center; padding:5px 3px; }
 .cm-bottom-nav button.active { color:#3569B7; font-weight:800; }
 .cm-bottom-nav strong { font-size:20px; line-height:1; }
 .cm-profile-top { padding:15px; gap:13px; }
 .cm-profile-avatar { width:70px; height:70px; font-size:22px; }
 .cm-profile-form { grid-template-columns:1fr; }
 .cm-profile-field.full { grid-column:auto; }
}
`;

function loadSavedData(key, fallback) {
  try {
    if (typeof window === "undefined") return fallback;
    const saved = window.localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved) ?? fallback;
  } catch {
    return fallback;
  }
}

function clockMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDayKey(date = new Date()) {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()];
}

function prettyTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

function getInitials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  return words.length ? words.slice(0, 2).map(word => word[0].toUpperCase()).join("") : "CM";
}

function classInfo(name) {
  const code = name.trim().split(" ")[0];
  return subjectInfo[code] || { full: name.trim(), color: "#E8EEF7", icon: "📚" };
}

function plainText(html) {
  if (typeof document === "undefined") return String(html || "").replace(/<[^>]*>/g, " ");
  const element = document.createElement("div");
  element.innerHTML = html || "";
  return (element.textContent || "").replace(/\s+/g, " ").trim();
}

// Keep only simple formatting tags in saved notes.
function cleanNoteHTML(html) {
  if (typeof document === "undefined") return "";
  const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
  const allowed = new Set(["B", "STRONG", "I", "EM", "U", "H1", "H2", "H3", "P", "BR", "UL", "OL", "LI", "BLOCKQUOTE", "DIV"]);

  function cleanNode(node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === 1) {
        cleanNode(child);
        if (!allowed.has(child.tagName)) {
          child.replaceWith(...Array.from(child.childNodes));
        } else {
          Array.from(child.attributes).forEach(attr => child.removeAttribute(attr.name));
        }
      } else if (child.nodeType !== 3) {
        child.remove();
      }
    });
  }

  cleanNode(doc.body);
  return doc.body.innerHTML;
}

function createEmptyNote() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: "",
    subject: "General",
    content: "",
    attachments: [],
    updatedAt: new Date().toISOString(),
  };
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [subjects, setSubjects] = useState(() => loadSavedData("campusmate-subjects", initialSubjects));
  const [tasks, setTasks] = useState(() => loadSavedData("campusmate-tasks", initialTasks));
  const [schedule, setSchedule] = useState(() => loadSavedData("campusmate-timetable", initialTimetable));
  const [profile, setProfile] = useState(() => ({
    ...initialProfile,
    ...loadSavedData("campusmate-profile", {}),
  }));
  const [profileDraft, setProfileDraft] = useState(null);
  const [notes, setNotes] = useState(() => {
    const saved = loadSavedData("campusmate-notes", []);
    return Array.isArray(saved) ? saved : [];
  });
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState(null);
  const [noteSearch, setNoteSearch] = useState("");
  const [noteFilter, setNoteFilter] = useState("All");
  const [noteMessage, setNoteMessage] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [showId, setShowId] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDay, setSelectedDay] = useState(getDayKey());
  const [clock, setClock] = useState(() => new Date());
  const [editingSchedule, setEditingSchedule] = useState(false);
  const editorRef = useRef(null);
  const attachmentInputRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem("campusmate-subjects", JSON.stringify(subjects)); }
    catch (error) { console.error("Attendance save failed:", error); }
  }, [subjects]);

  useEffect(() => {
    try { localStorage.setItem("campusmate-tasks", JSON.stringify(tasks)); }
    catch (error) { console.error("Tasks save failed:", error); }
  }, [tasks]);

  useEffect(() => {
    try { localStorage.setItem("campusmate-timetable", JSON.stringify(schedule)); }
    catch (error) { console.error("Timetable save failed:", error); }
  }, [schedule]);

  useEffect(() => {
    try { localStorage.setItem("campusmate-profile", JSON.stringify(profile)); }
    catch (error) { console.error("Profile save failed:", error); }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem("campusmate-notes", JSON.stringify(notes));
      setNoteMessage("");
    } catch (error) {
      console.error("Notes save failed:", error);
      setNoteMessage("Storage is full. Remove a large attachment or delete an old note to save changes.");
    }
  }, [notes]);

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedDay(getDayKey(clock));
  }, [clock]);

  useEffect(() => {
    if (noteDraft && editorRef.current && editorRef.current.innerHTML !== noteDraft.content) {
      editorRef.current.innerHTML = noteDraft.content || "";
    }
  }, [noteDraft?.id]);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setSelectedSubject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProfile = () => {
    setProfileDraft({ ...profile });
    setProfileMessage("");
    goTo("Profile Settings");
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setProfile({
      ...profileDraft,
      name: profileDraft.name.trim() || "Student",
      branch: profileDraft.branch.trim(),
      college: profileDraft.college.trim(),
      year: profileDraft.year.trim(),
      semester: profileDraft.semester.trim(),
      enrollment: profileDraft.enrollment.trim(),
    });
    setProfileDraft(null);
    goTo("Dashboard");
  };

  const toggleTask = id => setTasks(old => old.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  ));

  const updateSubject = (name, field, value) => {
    const number = Math.max(0, Math.floor(Number(value) || 0));
    setSubjects(old => old.map(subject => {
      if (subject.name !== name) return subject;
      const updated = { ...subject, [field]: number };
      if (updated.attended > updated.total) {
        if (field === "attended") updated.total = number;
        else updated.attended = number;
      }
      return updated;
    }));
  };

  const updateClass = (index, day, value) => {
    setSchedule(old => old.map((row, i) => i === index ? { ...row, [day]: value } : row));
  };

  const openNewNote = () => {
    const draft = createEmptyNote();
    setActiveNoteId(draft.id);
    setNoteDraft(draft);
    setNoteMessage("");
  };

  const openExistingNote = note => {
    setActiveNoteId(note.id);
    setNoteDraft({ ...note });
    setNoteMessage("");
  };

  const updateDraft = (field, value) => {
    setNoteDraft(old => old ? { ...old, [field]: value } : old);
  };

  const applyFormatting = (command, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    updateDraft("content", cleanNoteHTML(editorRef.current.innerHTML));
  };

  const saveNote = (event) => {
    event?.preventDefault();
    if (!noteDraft) return;

    const title = noteDraft.title.trim();
    const content = cleanNoteHTML(editorRef.current?.innerHTML ?? noteDraft.content);
    if (!title) {
      setNoteMessage("Please give your note a title before saving.");
      return;
    }

    if (!plainText(content) && !(noteDraft.attachments || []).length) {
      setNoteMessage("Add some text or attach a file before saving.");
      return;
    }

    const savedNote = {
      ...noteDraft,
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    const nextNotes = [
      savedNote,
      ...notes.filter(note => note.id !== savedNote.id),
    ];

    // Check browser storage before replacing the saved list.
    try {
      localStorage.setItem("campusmate-notes", JSON.stringify(nextNotes));
      setNotes(nextNotes);
      setActiveNoteId(savedNote.id);
      setNoteDraft(savedNote);
      setNoteMessage("Note saved successfully! 💾");
    } catch (error) {
      setNoteMessage("Could not save. Browser storage may be full. Try a smaller attachment.");
    }
  };

  const deleteNote = id => {
    if (!window.confirm("Delete this note permanently?")) return;
    const nextNotes = notes.filter(note => note.id !== id);

    try {
      localStorage.setItem("campusmate-notes", JSON.stringify(nextNotes));
      setNotes(nextNotes);
      if (activeNoteId === id) {
        setActiveNoteId(null);
        setNoteDraft(null);
      }
      setNoteMessage("Note deleted.");
    } catch {
      setNoteMessage("Couldn't update saved notes. Please try again.");
    }
  };

  const addAttachments = event => {
    const files = Array.from(event.target.files || []);
    if (!noteDraft || !files.length) return;

    const allowedFiles = files.filter(file =>
      file.type === "application/pdf" || file.type.startsWith("image/")
    );

    if (allowedFiles.length !== files.length) {
      setNoteMessage("Only PDF files and images are supported.");
    }

    const tooLarge = allowedFiles.filter(file => file.size > 700 * 1024);
    if (tooLarge.length) {
      setNoteMessage("Each attachment must be smaller than 700 KB to help it fit in browser storage.");
    }

    const readyFiles = allowedFiles.filter(file => file.size <= 700 * 1024);
    if (!readyFiles.length) {
      event.target.value = "";
      return;
    }

    Promise.all(readyFiles.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        data: String(reader.result),
      });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    }))).then(results => {
      const successful = results.filter(Boolean);
      setNoteDraft(old => old ? {
        ...old,
        attachments: [...(old.attachments || []), ...successful],
      } : old);
      if (successful.length) setNoteMessage("Attachment added. Save the note to keep it.");
    });

    event.target.value = "";
  };

  const removeAttachment = id => {
    setNoteDraft(old => old ? {
      ...old,
      attachments: old.attachments.filter(file => file.id !== id),
    } : old);
  };

  const visibleNotes = notes.filter(note => {
    const matchesFilter = noteFilter === "All" || note.subject === noteFilter;
    const searchable = `${note.title} ${note.subject} ${plainText(note.content)}`.toLowerCase();
    return matchesFilter && searchable.includes(noteSearch.toLowerCase());
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const attendanceAverage = subjects.length
    ? Math.round(subjects.reduce((sum, s) =>
        sum + (s.total ? s.attended / s.total * 100 : 0), 0) / subjects.length)
    : 0;

  const todayKey = getDayKey(clock);
  const todayName = days.find(d => d.key === todayKey)?.name || "Weekend";
  const nowMinutes = clock.getHours() * 60 + clock.getMinutes();

  const todayClasses = schedule.map((row, index) => ({
    ...row, index, name: row[todayKey] || "Free",
  })).filter(row => row.name !== "Free" && row.name !== "Break")
    .map(row => ({ ...row, startMinutes: clockMinutes(row.time), endMinutes: clockMinutes(row.end) }));

  const currentClass = todayClasses.find(row => nowMinutes >= row.startMinutes && nowMinutes < row.endMinutes);
  const upcomingClass = todayClasses.find(row => row.startMinutes > nowMinutes);

  const attendanceContent = list => (
    <div style={{ display: "grid", gap: 19 }}>
      {list.map(subject => {
        const pct = subject.total > 0 ? Math.round(subject.attended / subject.total * 100) : 0;
        const belowTarget = pct < 75;
        const classesNeeded = belowTarget ? Math.max(0, Math.ceil((0.75 * subject.total - subject.attended) / 0.25)) : 0;
        return (
          <div key={subject.name} style={{ padding: 16, border: "1px solid #EDF1F7", borderRadius: 14, background: "#FCFDFF" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ width: 35, height: 35, borderRadius: 10, display: "grid", placeItems: "center", background: subject.color }}>{subject.icon}</span>
                <div><div style={{ fontSize: 14, fontWeight: 800 }}>{subject.name}</div><div className="cm-muted">{subject.attended} attended out of {subject.total} classes</div></div>
              </div>
              <strong style={{ color: belowTarget ? "#C17A25" : "#278361", fontSize: 20 }}>{pct}%</strong>
            </div>
            <div className="cm-progress"><div className="cm-progress-fill" style={{ width: `${Math.min(100, pct)}%`, background: belowTarget ? "#E7A34F" : "#50AB8B" }} /></div>
            <div className="cm-inputs">
              <label className="cm-label">Classes attended<input className="cm-input" type="number" min="0" max={subject.total} value={subject.attended} onChange={e => updateSubject(subject.name, "attended", e.target.value)} /></label>
              <label className="cm-label">Total classes<input className="cm-input" type="number" min={subject.attended} value={subject.total} onChange={e => updateSubject(subject.name, "total", e.target.value)} /></label>
            </div>
            <div className="cm-status" style={{ background: belowTarget ? "#FFF7E8" : "#E5F4ED", color: belowTarget ? "#A66C22" : "#278361" }}>
              {belowTarget ? `Below 75% target. Attend ${classesNeeded} more consecutive classes to reach 75%.` : "Great! You are meeting the 75% attendance target! 🎉"}
            </div>
          </div>
        );
      })}
    </div>
  );

  const timetable = (
    <div className="cm-table-wrap">
      <table className="cm-table">
        <thead><tr><th>Time</th>{days.map(day => <th key={day.key}>{day.name}</th>)}</tr></thead>
        <tbody>{schedule.map((row, i) => (
          <tr key={`${row.time}-${row.end}`}>
            <td>{prettyTime(row.time)}–{prettyTime(row.end)}</td>
            {days.map(day => {
              const isNow = day.key === todayKey && nowMinutes >= clockMinutes(row.time) && nowMinutes < clockMinutes(row.end);
              const name = row[day.key] || "Free";
              return <td key={day.key} className={isNow ? "current" : ""}>
                {editingSchedule
                  ? <input aria-label={`${day.name} ${row.time}`} value={name} onChange={e => updateClass(i, day.key, e.target.value)} style={{ width: 105, minWidth: 80, padding: 6, border: "1px solid #D6E3F8", borderRadius: 6, fontSize: 11 }} />
                  : <>{name}{isNow && <div style={{ fontSize: 8, marginTop: 4 }}>● NOW</div>}</>}
              </td>;
            })}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );

  const dailyTimetable = (
    <div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
        {days.map(day => <button key={day.key} className={`cm-btn ${selectedDay === day.key ? "" : "cm-btn-light"}`} onClick={() => setSelectedDay(day.key)}>{day.name.slice(0, 3)}{day.key === todayKey ? " · Today" : ""}</button>)}
      </div>
      {selectedDay === "sat" || selectedDay === "sun" ? (
        <div className="cm-status" style={{ background: "#F2F6FC", color: "#52647C" }}>No weekday classes are listed for this day.</div>
      ) : schedule.map((row, index) => {
        const name = row[selectedDay] || "Free";
        const start = clockMinutes(row.time);
        const end = clockMinutes(row.end);
        const isNow = selectedDay === todayKey && nowMinutes >= start && nowMinutes < end && name !== "Free" && name !== "Break";
        const isNext = selectedDay === todayKey && !currentClass && upcomingClass?.index === index;
        const info = classInfo(name);
        return (
          <div key={`${row.time}-${row.end}`} className={`cm-class-card ${isNow ? "now" : isNext ? "next" : ""}`}>
            <div className="cm-class-time">{prettyTime(row.time)} – {prettyTime(row.end)}</div>
            <div style={{ display: "flex", gap: 11, alignItems: "center", marginTop: 8 }}>
              <div style={{ width: 42, height: 42, display: "grid", placeItems: "center", background: info.color, borderRadius: 12, fontSize: 20 }}>{name === "Break" ? "☕" : name === "Free" ? "✨" : info.icon}</div>
              <div style={{ flex: 1 }}><div className="cm-class-name" style={{ margin: "0 0 4px" }}>{name === "Free" ? "Free period" : name}</div><div className="cm-muted">{name === "Break" ? "Take a little break" : info.full}</div></div>
              {isNow && <span className="cm-tag">NOW</span>}
              {isNext && <span className="cm-tag" style={{ background: "#D9F3E6", color: "#278361" }}>UP NEXT</span>}
            </div>
          </div>
        );
      })}
    </div>
  );

  const avatar = (size = 48) => (
    <div className="cm-avatar" style={{ width: size, height: size, fontSize: size * 0.32 }}>
      {profile.photo ? <img src={profile.photo} alt="Profile" /> : getInitials(profile.name)}
    </div>
  );

  const noteEditor = noteDraft && (
    <div>
      <div className="cm-profile-form">
        <label className="cm-label cm-profile-field">
          Note title
          <input className="cm-input" maxLength={120} placeholder="e.g. Normalisation in DBMS" value={noteDraft.title} onChange={e => updateDraft("title", e.target.value)} />
        </label>
        <label className="cm-label cm-profile-field">
          Subject
          <select className="cm-input" value={noteDraft.subject} onChange={e => updateDraft("subject", e.target.value)}>
            {["General", "DBMS", "Data Structures", "Digital Logic", "Mathematics", "Discrete Mathematics", "OOPs", "Other"].map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="cm-label" style={{ marginBottom: 8 }}>Note content</div>
        <div className="cm-toolbar">
          <button type="button" title="Bold" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("bold")}><b>B</b></button>
          <button type="button" title="Italic" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("italic")}><i>I</i></button>
          <button type="button" title="Underline" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("underline")}><u>U</u></button>
          <button type="button" title="Heading 1" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("formatBlock", "h1")}>H1</button>
          <button type="button" title="Heading 2" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("formatBlock", "h2")}>H2</button>
          <button type="button" title="Paragraph" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("formatBlock", "p")}>P</button>
          <button type="button" title="Bullet list" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("insertUnorderedList")}>• List</button>
          <button type="button" title="Numbered list" onMouseDown={e => e.preventDefault()} onClick={() => applyFormatting("insertOrderedList")}>1. List</button>
        </div>
        <div
          ref={editorRef}
          className="cm-editor"
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Note content editor"
          aria-multiline="true"
          data-placeholder="Start writing your notes here..."
          onInput={e => updateDraft("content", cleanNoteHTML(e.currentTarget.innerHTML))}
          onBlur={e => updateDraft("content", cleanNoteHTML(e.currentTarget.innerHTML))}
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <strong style={{ fontSize: 13 }}>Attachments</strong>
          <button className="cm-btn cm-btn-light" type="button" onClick={() => attachmentInputRef.current?.click()}>＋ Add PDF / image</button>
          <input ref={attachmentInputRef} type="file" accept="application/pdf,image/*" multiple hidden onChange={addAttachments} />
        </div>
        <div className="cm-muted" style={{ marginTop: 5 }}>PDF and image files up to 700 KB each. Browser storage is limited.</div>
        {(noteDraft.attachments || []).map(file => (
          <div className="cm-attachment" key={file.id}>
            <span style={{ fontSize: 23 }}>{file.type === "application/pdf" ? "📄" : "🖼️"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, overflowWrap: "anywhere" }}>{file.name}</div>
              <div className="cm-muted">{Math.max(1, Math.round(file.size / 1024))} KB</div>
            </div>
            <a href={file.data} target="_blank" rel="noreferrer" className="cm-btn cm-btn-light" style={{ textDecoration: "none" }}>Open</a>
            <button className="cm-btn cm-btn-light" type="button" onClick={() => removeAttachment(file.id)}>Remove</button>
          </div>
        ))}
      </div>

      {noteMessage && <div className="cm-status" style={{ background: noteMessage.includes("successfully") || noteMessage === "Note deleted." ? "#E5F4ED" : "#FFF7E8", color: noteMessage.includes("successfully") || noteMessage === "Note deleted." ? "#278361" : "#94651E" }}>{noteMessage}</div>}

      <div className="cm-profile-actions">
        <button className="cm-btn cm-btn-light" type="button" onClick={() => { setNoteDraft(null); setActiveNoteId(null); setNoteMessage(""); }}>Close editor</button>
        {notes.some(note => note.id === noteDraft.id) && <button className="cm-btn cm-btn-light" type="button" onClick={() => deleteNote(noteDraft.id)}>Delete note</button>}
        <button className="cm-btn" type="button" onClick={saveNote}>Save note 💾</button>
      </div>
    </div>
  );

  return (
    <div className="cm-app">
      <style>{css}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside className="cm-sidebar">
          <div className="cm-brand"><span className="cm-brand-mark">C</span>CampusMate</div>
          <div style={{ fontSize: 10, color: "#9FB1CD", letterSpacing: 1.3, margin: "38px 10px 12px", fontWeight: 800 }}>WORKSPACE</div>
          {navItems.map(item => <button key={item.name} className={`cm-nav ${page === item.name && !selectedSubject ? "active" : ""}`} onClick={() => goTo(item.name)}><span style={{ fontSize: 20, width: 22, textAlign: "center" }}>{item.icon}</span>{item.name}</button>)}
          <button className={`cm-nav ${page === "Profile Settings" ? "active" : ""}`} onClick={openProfile}><span style={{ fontSize: 20, width: 22, textAlign: "center" }}>⚙</span>Profile Settings</button>
          <div style={{ marginTop: "auto", padding: "20px 9px 0" }}>
            <div style={{ height: 1, background: "#FFFFFF20", marginBottom: 18 }} />
            <div style={{ fontSize: 12, color: "#CFD9E9", lineHeight: 1.7 }}>Your campus, organised.</div>
            <div style={{ fontSize: 11, color: "#8FA4C4" }}>Study smarter ✦</div>
          </div>
        </aside>

        <main className="cm-main">
          <header className="cm-top">
            <div>
              <div className="cm-kicker">STUDENT WORKSPACE</div>
              <h1 className="cm-title">{page === "Dashboard" && !selectedSubject ? `Hello ${profile.name || "Student"}!!! 👋` : page === "Profile Settings" ? "Profile Settings" : selectedSubject || page}</h1>
              <div className="cm-muted">{page === "Dashboard" && !selectedSubject ? "Ready to make today productive?" : page === "Timetable" ? `${todayName} · ${clock.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : "Everything you need, all in one place."}</div>
            </div>
            <button className="cm-avatar-button" title="Open profile settings" aria-label="Open profile settings" onClick={openProfile}>{avatar(48)}</button>
          </header>

          {!selectedSubject && page === "Profile Settings" && profileDraft && (
            <section className="cm-card">
              <div className="cm-profile-top">
                <div className="cm-profile-avatar">{profileDraft.photo ? <img src={profileDraft.photo} alt="Profile preview" /> : getInitials(profileDraft.name)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cm-kicker">YOUR STUDENT PROFILE</div>
                  <h2 style={{ margin: "7px 0", fontSize: 21 }}>{profileDraft.name || "Your name"}</h2>
                  <div className="cm-muted">{profileDraft.branch || "Your branch"} · {profileDraft.college || "Your college"}</div>
                  <label className="cm-btn cm-btn-light" style={{ display: "inline-block", marginTop: 12, cursor: "pointer" }}>📷 {profileDraft.photo ? "Change photo" : "Upload photo"}<input type="file" accept="image/*" hidden onChange={event => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (!file.type.startsWith("image/")) { setProfileMessage("Please choose an image."); return; }
                    if (file.size > 2 * 1024 * 1024) { setProfileMessage("Choose a photo smaller than 2 MB."); return; }
                    const reader = new FileReader();
                    reader.onload = () => setProfileDraft(old => ({ ...old, photo: String(reader.result) }));
                    reader.onerror = () => setProfileMessage("Couldn't read that photo.");
                    reader.readAsDataURL(file);
                  }} /></label>
                  {profileDraft.photo && <button className="cm-btn cm-btn-light" style={{ marginLeft: 7, marginTop: 12 }} onClick={() => setProfileDraft(old => ({ ...old, photo: "" }))}>Remove photo</button>}
                </div>
              </div>
              <h2 className="cm-section-title">Personal & Academic Details</h2>
              <form onSubmit={event => { event.preventDefault(); setProfile({ ...profileDraft, name: profileDraft.name.trim() || "Student" }); setProfileDraft(null); goTo("Dashboard"); }}>
                <div className="cm-profile-form">
                  {[
                    ["name", "Full name"],
                    ["branch", "Branch / Programme"],
                    ["college", "College / Institute"],
                    ["year", "Year"],
                    ["semester", "Semester"],
                    ["enrollment", "Enrollment number"],
                  ].map(([key, label]) => <label key={key} className={`cm-label cm-profile-field ${key === "college" || key === "enrollment" ? "full" : ""}`}>{label}<input className="cm-input" required={key === "name"} value={profileDraft[key] || ""} onChange={e => setProfileDraft(old => ({ ...old, [key]: e.target.value }))} /></label>)}
                </div>
                {profileMessage && <div className="cm-status">{profileMessage}</div>}
                <div className="cm-profile-actions"><button type="button" className="cm-btn cm-btn-light" onClick={() => { setProfileDraft(null); goTo("Dashboard"); }}>Cancel</button><button type="submit" className="cm-btn">Save Changes ✓</button></div>
              </form>
              <div className="cm-status" style={{ background: "#F2F6FC", color: "#52647C" }}>Your profile is saved in this browser. Photos are optional.</div>
            </section>
          )}

          {!selectedSubject && page === "Dashboard" && (
            <div className="cm-grid">
              <section className="cm-span-7"><div className="cm-id"><div><div className="cm-kicker">YOUR STUDENT PROFILE</div><h3>Digital ID</h3><div style={{ fontSize: 13, fontWeight: 700 }}>{profile.name}</div><div style={{ fontSize: 11, color: "#607797", marginTop: 5 }}>B.Tech {profile.branch} · {profile.year}</div></div><button className="cm-btn" onClick={() => setShowId(true)}>View ID ↗</button></div></section>
              <section className="cm-span-5"><div className="cm-card cm-next" style={{ height: "100%" }}><div className="cm-kicker">{currentClass ? "HAPPENING NOW" : "UP NEXT"}</div><div style={{ fontSize: 13, fontWeight: 700, marginTop: 13 }}>{currentClass ? "Current Class" : "Next Class"}</div><div className="cm-next-name">{currentClass?.name || upcomingClass?.name || "No more classes"}</div><div className="cm-muted">{currentClass ? `${prettyTime(currentClass.time)} – ${prettyTime(currentClass.end)}` : upcomingClass ? `${prettyTime(upcomingClass.time)} · ${todayName}` : "Enjoy the rest of your day! 🎉"}</div><button className="cm-btn cm-btn-light" style={{ marginTop: 17 }} onClick={() => goTo("Timetable")}>View timetable →</button></div></section>
              <section className="cm-span-8"><div className="cm-card"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}><h2 className="cm-section-title">My Subjects</h2><button className="cm-btn cm-btn-light" onClick={() => goTo("Attendance")}>Attendance →</button></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))", gap: 12 }}>{subjects.map(subject => <button key={subject.name} className="cm-subject" onClick={() => { setSelectedSubject(subject.name); setPage("Attendance"); }}><span className="cm-subject-icon" style={{ background: subject.color }}>{subject.icon}</span><span style={{ flex: 1, minWidth: 0 }}><span className="cm-subject-name" style={{ display: "block" }}>{subject.name}</span><span className="cm-muted" style={{ fontSize: 10 }}>Attendance · Marks · Syllabus</span></span><span style={{ color: "#5985C7", fontSize: 20 }}>›</span></button>)}</div></div></section>
              <section className="cm-span-4"><div className="cm-update"><div className="cm-kicker" style={{ color: "#A77B31" }}>CAMPUS NOTICE</div><h2 style={{ fontSize: 17, margin: "11px 0 7px" }}>Latest Updates!!</h2><div style={{ fontWeight: 800, fontSize: 13 }}>Tarang Fest 🎉</div><p style={{ color: "#8C754E", fontSize: 12, lineHeight: 1.6, marginBottom: 13 }}>Project submission deadline · 20 Feb</p><button className="cm-btn cm-btn-light" onClick={() => goTo("Assignments")}>View tasks →</button></div><div className="cm-card" style={{ marginTop: 15 }}><div className="cm-kicker">QUICK TASKS</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 9 }}><strong style={{ fontSize: 14 }}>Your to-do list</strong><span className="cm-pill">{tasks.filter(t => t.done).length}/{tasks.length} done</span></div>{tasks.slice(0, 2).map(task => <label key={task.id} className="cm-task" style={{ cursor: "pointer" }}><input className="cm-check" type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span><span className={task.done ? "cm-task-done" : ""} style={{ display: "block", fontSize: 12, fontWeight: 700 }}>{task.title}</span><span className="cm-muted" style={{ fontSize: 10 }}>{task.detail}</span></span></label>)}<button className="cm-btn cm-btn-light" style={{ marginTop: 13 }} onClick={() => goTo("Assignments")}>All tasks →</button></div></section>
              <section className="cm-span-12"><div className="cm-card"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 15 }}><div><h2 className="cm-section-title" style={{ marginBottom: 5 }}>Today's Timetable</h2><div className="cm-muted">Current and upcoming classes update automatically</div></div><button className="cm-btn cm-btn-light" onClick={() => goTo("Timetable")}>Full timetable →</button></div>{dailyTimetable}</div></section>
            </div>
          )}

          {!selectedSubject && page === "Attendance" && <><div className="cm-grid" style={{ marginBottom: 20 }}><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">📊</div><div className="cm-stat-value">{attendanceAverage}%</div><div className="cm-stat-label">Average attendance</div></div></div><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">📚</div><div className="cm-stat-value">{subjects.length}</div><div className="cm-stat-label">Subjects tracked</div></div></div><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">🎯</div><div className="cm-stat-value">75%</div><div className="cm-stat-label">Attendance target</div></div></div></div><section className="cm-card"><h2 className="cm-section-title">Subject-wise Attendance</h2>{attendanceContent(subjects)}</section></>}

          {selectedSubject && <div className="cm-card"><button className="cm-btn cm-btn-light" onClick={() => setSelectedSubject(null)}>← Back to attendance</button><div style={{ marginTop: 22 }}>{attendanceContent(subjects.filter(s => s.name === selectedSubject))}</div><div style={{ marginTop: 22, padding: 16, borderRadius: 12, background: "#F2F6FC" }}><strong style={{ fontSize: 13 }}>Subject resources</strong><p className="cm-muted">Use this area for marks, syllabus, notes and study resources for {selectedSubject}.</p><button className="cm-btn cm-btn-light" onClick={() => { setNoteFilter(selectedSubject); goTo("Notes"); }}>Open notes for this subject →</button></div></div>}

          {!selectedSubject && page === "Timetable" && <div style={{ display: "grid", gap: 20 }}><section className="cm-card"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}><div><h2 className="cm-section-title" style={{ marginBottom: 6 }}>Your Class Schedule 🗓️</h2><p className="cm-muted">Select a day to see classes and highlights.</p></div><button className="cm-btn cm-btn-light" onClick={() => setEditingSchedule(v => !v)}>{editingSchedule ? "Done editing ✓" : "Edit timetable ✎"}</button></div>{editingSchedule && <div className="cm-status" style={{ background: "#FFF7E8", color: "#8C682A" }}>Changes save automatically.</div>}{dailyTimetable}</section><section className="cm-card"><h2 className="cm-section-title">Full Weekly View</h2>{timetable}</section></div>}

          {!selectedSubject && page === "Notes" && (
            <div style={{ display: "grid", gap: 18 }}>
              <section className="cm-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div><h2 className="cm-section-title" style={{ marginBottom: 5 }}>My Notes 📚</h2><div className="cm-muted">{notes.length} saved {notes.length === 1 ? "note" : "notes"} · Your personal study space</div></div>
                  <button className="cm-btn" onClick={openNewNote}>＋ New note</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 18 }}>
                  <input className="cm-search" placeholder="🔎 Search notes..." value={noteSearch} onChange={e => setNoteSearch(e.target.value)} />
                  <select className="cm-search" value={noteFilter} onChange={e => setNoteFilter(e.target.value)}>
                    {["All", "General", "DBMS", "Data Structures", "Digital Logic", "Mathematics", "Discrete Mathematics", "OOPs", "Other"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {noteMessage && <div className="cm-status" style={{ background: noteMessage.includes("successfully") || noteMessage === "Note deleted." ? "#E5F4ED" : "#FFF7E8", color: noteMessage.includes("successfully") || noteMessage === "Note deleted." ? "#278361" : "#94651E" }}>{noteMessage}</div>}
              </section>

              <div className="cm-notes-layout">
                <section className="cm-card">
                  <h2 className="cm-section-title">Your notebook</h2>
                  {visibleNotes.length === 0 ? <div style={{ textAlign: "center", padding: "25px 10px" }}><div style={{ fontSize: 35 }}>📝</div><strong style={{ display: "block", marginTop: 10 }}>No notes found</strong><p className="cm-muted">Create a note or try another search.</p><button className="cm-btn" onClick={openNewNote}>Create your first note</button></div> : <div style={{ display: "grid", gap: 9 }}>{visibleNotes.map(note => <button key={note.id} className={`cm-note-item ${activeNoteId === note.id ? "selected" : ""}`} onClick={() => openExistingNote(note)}><div className="cm-note-title">{note.title || "Untitled note"}</div><div className="cm-note-preview">{note.subject} · {plainText(note.content).slice(0, 100) || "No text preview"}{note.attachments?.length ? ` · 📎 ${note.attachments.length}` : ""}</div><div className="cm-muted" style={{ fontSize: 10, marginTop: 7 }}>{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ""}</div></button>)}</div>}
                </section>

                <section className="cm-card">
                  {!noteDraft ? <div style={{ textAlign: "center", padding: "45px 12px" }}><div style={{ fontSize: 38 }}>✍️</div><h2 style={{ fontSize: 17 }}>Your notes editor</h2><p className="cm-muted">Select a note from your notebook or create a new one.</p><button className="cm-btn" onClick={openNewNote}>＋ Create note</button></div> : <>{noteEditor}</>}
                </section>
              </div>
            </div>
          )}

          {!selectedSubject && page === "Assignments" && <><div className="cm-grid" style={{ marginBottom: 20 }}><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">📝</div><div className="cm-stat-value">{tasks.length - tasks.filter(t => t.done).length}</div><div className="cm-stat-label">Tasks remaining</div></div></div><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">✓</div><div className="cm-stat-value">{tasks.filter(t => t.done).length}</div><div className="cm-stat-label">Tasks completed</div></div></div><div className="cm-span-4"><div className="cm-stat"><div className="cm-stat-icon">🎯</div><div className="cm-stat-value">{tasks.length ? Math.round(tasks.filter(t => t.done).length / tasks.length * 100) : 0}%</div><div className="cm-stat-label">Completion</div></div></div></div><section className="cm-card"><h2 className="cm-section-title">Quick Tasks & Assignments</h2>{tasks.map(task => <label key={task.id} className="cm-task" style={{ cursor: "pointer" }}><input className="cm-check" type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span style={{ flex: 1 }}><span className={task.done ? "cm-task-done" : ""} style={{ display: "block", fontSize: 14, fontWeight: 700 }}>{task.title}</span><span className="cm-muted">{task.detail}</span></span><span className="cm-muted">{task.done ? "Completed" : "Pending"}</span></label>)}</section></>}

          <footer style={{ marginTop: 27, padding: "15px 2px", color: "#8B9AB0", fontSize: 11, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}><span>© CampusMate · Your campus companion</span><span>Made for students, with 💙</span></footer>
        </main>
      </div>

      <nav className="cm-bottom-nav">
        {navItems.map(item => <button key={item.name} className={page === item.name ? "active" : ""} onClick={() => goTo(item.name)}><strong>{item.icon}</strong><span>{item.name}</span></button>)}
        <button className={page === "Profile Settings" ? "active" : ""} onClick={openProfile}><strong>⚙</strong><span>Profile</span></button>
      </nav>

      {showId && <div onClick={() => setShowId(false)} style={{ position: "fixed", inset: 0, background: "#10213BB8", display: "grid", placeItems: "center", padding: 20, zIndex: 20 }}><div onClick={e => e.stopPropagation()} style={{ background: "white", width: "100%", maxWidth: 390, borderRadius: 22, overflow: "hidden", boxShadow: "0 20px 70px #0003" }}><div style={{ padding: 22, background: "linear-gradient(120deg,#DCEAFF,#EEF4FF)", textAlign: "center" }}><div className="cm-brand" style={{ fontSize: 18, color: "#172B4D" }}>CampusMate</div><div style={{ display: "grid", placeItems: "center", margin: "20px auto 12px" }}>{avatar(70)}</div><h2 style={{ margin: "0 0 6px", fontSize: 20 }}>{profile.name}</h2><div style={{ color: "#607797", fontSize: 12 }}>B.Tech {profile.branch}</div></div><div style={{ padding: 22 }}>{[["Student", profile.name], ["Programme", profile.branch], ["College", profile.college], ["Year", profile.year], ["Semester", profile.semester], ["Enrollment", profile.enrollment || "Not added"]].map(([label, value]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 15, padding: "10px 0", borderBottom: "1px solid #EDF1F7", fontSize: 12 }}><span className="cm-muted">{label}</span><strong style={{ textAlign: "right", overflowWrap: "anywhere" }}>{value}</strong></div>)}<button className="cm-btn cm-btn-light" style={{ width: "100%", marginTop: 12 }} onClick={() => { setShowId(false); openProfile(); }}>Edit profile ✎</button><button className="cm-btn" style={{ width: "100%", marginTop: 8 }} onClick={() => setShowId(false)}>Close ID</button></div></div></div>}
    </div>
  );
}