import {
  CheckCircle2,
  Clock3,
  Edit3,
  MessageSquare,
  Paperclip,
  UserPlus,
} from "lucide-react";
import "./ActivityTimeline.css";

function ActivityTimeline({ activities = [], loading = false }) {
  /* ==========================================
     Helpers
  ========================================== */

  const getActivityIcon = (type = "") => {
    switch (type.toUpperCase()) {
      case "CREATED":
        return <Clock3 size={18} />;

      case "UPDATED":
        return <Edit3 size={18} />;

      case "STATUS_CHANGED":
        return <CheckCircle2 size={18} />;

      case "ASSIGNED":
        return <UserPlus size={18} />;

      case "COMMENT":
        return <MessageSquare size={18} />;

      case "ATTACHMENT":
        return <Paperclip size={18} />;

      default:
        return <Clock3 size={18} />;
    }
  };

  const getUserName = (activity) =>
    activity.user ||
    activity.user_name ||
    activity.created_by_name ||
    activity.createdByName ||
    "System";

  const getRole = (activity) =>
    activity.role || activity.user_role || activity.designation || "User";

  const getTime = (activity) => {
    const value =
      activity.time ||
      activity.created_at ||
      activity.createdAt ||
      activity.updated_at;

    if (!value) return "Just now";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getMessage = (activity) =>
    activity.message ||
    activity.description ||
    activity.activity ||
    "Task updated.";

  /* ==========================================
     Loading
  ========================================== */

  if (loading) {
    return (
      <section className="activity-timeline task-card">
        <h2>Activity Timeline</h2>

        <div className="timeline-loading">Loading activity...</div>
      </section>
    );
  }

  /* ==========================================
     Empty
  ========================================== */

  if (!activities.length) {
    return (
      <section className="activity-timeline task-card">
        <h2>Activity Timeline</h2>

        <div className="timeline-empty">
          <div className="timeline-empty-icon">🕒</div>

          <h3>No Activity Yet</h3>

          <p>Task activity will appear here automatically.</p>
        </div>
      </section>
    );
  }

  /* ==========================================
     UI
  ========================================== */

  return (
    <section className="activity-timeline task-card">
      <h2>Activity Timeline</h2>

      <div className="timeline-list">
        {activities.map((activity, index) => {
          const userName = getUserName(activity);

          return (
            <div key={activity.id || index} className="timeline-item">
              <div className="timeline-icon">
                {getActivityIcon(activity.type)}
              </div>

              <div className="timeline-content">
                <div className="timeline-top">
                  <div className="timeline-user">
                    {activity.avatar || activity.profile_picture ? (
                      <img
                        src={activity.avatar || activity.profile_picture}
                        alt={userName}
                        className="timeline-avatar"
                      />
                    ) : (
                      <div className="timeline-avatar-placeholder">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="timeline-user-info">
                      <h4>{userName}</h4>

                      <span>{getRole(activity)}</span>
                    </div>
                  </div>

                  <span className="timeline-time">{getTime(activity)}</span>
                </div>

                <p className="timeline-message">{getMessage(activity)}</p>
              </div>

              {index !== activities.length - 1 && (
                <span className="timeline-line"></span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ActivityTimeline;
