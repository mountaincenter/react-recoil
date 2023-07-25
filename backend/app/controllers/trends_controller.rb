# frozen_string_literal: true

#
# trends controller
#
class TrendsController < ApplicationController
  def index
    @trends = Hashtag.trending(1.year)
    render json: @trends, each_serializer: TrendSerializer
  end
end
