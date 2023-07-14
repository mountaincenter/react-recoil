# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# frozen_string_literal: true

seed_models = %i[user todo message post]

all_process_time = Benchmark.realtime do
  seed_models.each do |model|
    puts "----#{model} start----"
    puts "count from: #{model.to_s.classify.constantize.count}"
    process_time = Benchmark.realtime do
      require "./db/seeds/#{model}_seeds"
    end
    puts "count to: #{model.to_s.classify.constantize.count}"
    puts "#{format('%.4<time>f', time: process_time)}s"
    puts "----#{model} end----"
  end
end
puts "#{format('%.4<time>f', time: all_process_time)}s"
