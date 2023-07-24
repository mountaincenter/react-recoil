# frozen_string_literal: true

class ElbController < ApplicationController
  def health_check
    render json: { status: 200, result: "ok" }
  end
end
