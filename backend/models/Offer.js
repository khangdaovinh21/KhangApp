const mongoose = require('mongoose');

// Định nghĩa schema cho Offer
const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
}, {
  timestamps: true // Thêm createdAt và updatedAt
});

// Middleware để tự động tính toán giá trị discountedPrice nếu chưa được cung cấp
offerSchema.pre('save', function(next) {
  if (this.discountPercentage && this.originalPrice) {
    this.discountedPrice = this.originalPrice * (1 - this.discountPercentage / 100);
  }
  next();
});

// Phương thức thực thể để áp dụng giảm giá
offerSchema.methods.applyDiscount = function() {
  this.discountedPrice = this.originalPrice * (1 - this.discountPercentage / 100);
  return this.discountedPrice;
};

// Phương thức tĩnh để tìm tất cả các offer có giảm giá lớn hơn một mức cụ thể
offerSchema.statics.findByDiscountGreaterThan = function(minDiscount, callback) {
  return this.find({ discountPercentage: { $gt: minDiscount } }, callback);
};

// Phương thức tĩnh để tìm và xóa một offer dựa trên ID
offerSchema.statics.findByIdAndDeleteOffer = function(id, callback) {
  return this.findByIdAndDelete(id, callback);
};

// Đăng ký model Offer với schema offerSchema
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
