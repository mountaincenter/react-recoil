require "csv"

unless Todo.exists?
  CSV.foreach('db/seeds/data.csv', headers: true) do |row|
    Todo.create!(
      title: row['title'],
      created_at: row['created_at'],
      is_complete: row['is_complete'],
      user_id: row['user_id']
    )
  end
end