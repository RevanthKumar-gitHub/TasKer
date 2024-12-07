CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    description TEXT,
    end_date TIMESTAMP NOT NULL,
    priority INT NOT NULL DEFAULT 3,
    status VARCHAR(30) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_tasks
BEFORE UPDATE ON tasks
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at();