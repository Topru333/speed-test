#include "math.h"
#include <vector>
#include <stdlib.h>

int Math::Fibonacci(int n){
  if (n <= 1) {
    return n;
  } else {
     return Math::Fibonacci(n-1) + Math::Fibonacci(n-2);
  }
}

int Math::FibonacciMap(int n){
  if (n <= 1) {
    return n;
  }

  std::vector<int> table(n+1);
  table[0] = 0;
  table[1] = 1;

  for (int i = 2; i <= n; i++) {
    table[i] = table[i-1] + table[i-2];
  }

  return table.back();
}

Napi::Number Math::FibonacciWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsBoolean()) {
      Napi::TypeError::New(env, "Wrong atributes").ThrowAsJavaScriptException();
  }

  Napi::Number value    = info[0].As<Napi::Number>();
  Napi::Boolean withmap = info[1].As<Napi::Boolean>();

  int result = 0;

  if (withmap) {
    result = Math::FibonacciMap(value.Int32Value());
  } else {
    result = Math::Fibonacci(value.Int32Value());
  }

  return Napi::Number::New(env, result);
}

double Math::Sqrt(double x, double g, double closeto) {
  if (abs(x/g - g) < closeto) {
    return g;
  } else {
    return Math::Sqrt(x, ((g + x/g) / 2), closeto);
  }
}

Napi::Number Math::SqrtWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber() || (info.Length() == 3 && !info[2].IsNumber())) {
      Napi::TypeError::New(env, "Wrong atributes").ThrowAsJavaScriptException();
  }

  Napi::Number x = info[0].As<Napi::Number>();
  Napi::Number g = info[1].As<Napi::Number>();
  double result = 0;

  if (info.Length() == 3) {
    Napi::Number closeto = info[2].As<Napi::Number>();
    result = Math::Sqrt(x.DoubleValue(), g.DoubleValue(), closeto.DoubleValue());
  } else {
    result = Math::Sqrt(x.DoubleValue(), g.DoubleValue(), 0.001);
  }

  return Napi::Number::New(env, result);
}

Napi::Object Math::Init(Napi::Env env, Napi::Object exports) {
  exports.Set("Fibonacci", Napi::Function::New(env, Math::FibonacciWrapped));
  exports.Set("Sqrt", Napi::Function::New(env, Math::SqrtWrapped));
  return exports;
}
