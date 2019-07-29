#include <napi.h>
#include <map>

namespace Math {

    int Fibonacci (int n);
    int FibonacciMap (int n);
    Napi::Number FibonacciWrapped (const Napi::CallbackInfo& info);

    double Sqrt (double x, double g, double closeto);
    Napi::Number SqrtWrapped (const Napi::CallbackInfo& info);

    Napi::Object Init (Napi::Env env, Napi::Object exports);

}
